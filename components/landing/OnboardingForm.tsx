"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  FlaskConical, Lightbulb, Building, GraduationCap,
  DollarSign, CheckCircle2, ArrowDown, AlertCircle, type LucideIcon
} from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";

type ProfileType = "researcher" | "project" | "company" | "university" | "funding";

const profileTypes: { key: ProfileType; label: string; Icon: LucideIcon }[] = [
  { key: "researcher", label: "Researcher / Expert",  Icon: FlaskConical },
  { key: "project",    label: "Project / Innovation", Icon: Lightbulb    },
  { key: "company",    label: "Company / Industry",   Icon: Building      },
  { key: "university", label: "University / Lab",     Icon: GraduationCap },
  { key: "funding",    label: "Funding Provider",     Icon: DollarSign    },
];

// ── Champs requis par profil ──────────────────────────────────────────────────
const requiredFields: Record<ProfileType, { name: string; label: string }[]> = {
  researcher: [
    { name: "fullName",      label: "Full Name" },
    { name: "email",         label: "Email" },
    { name: "country",       label: "Country" },
    { name: "institution",   label: "Institution / Position" },
    { name: "researchField", label: "Main Research Field" },
  ],
  project: [
    { name: "fullName",     label: "Full Name / Company Name" },
    { name: "email",        label: "Email" },
    { name: "country",      label: "Country" },
    { name: "projectTitle", label: "Project Title" },
    { name: "description",  label: "Short Description" },
    { name: "sector",       label: "Research Field / Sector" },
  ],
  company: [
    { name: "company",   label: "Company Name" },
    { name: "email",     label: "Email" },
    { name: "sector",    label: "Industry Sector" },
    { name: "challenge", label: "Innovation Challenge" },
  ],
  university: [
    { name: "institution",     label: "Institution Name" },
    { name: "email",           label: "Email" },
    { name: "country",         label: "Country" },
    { name: "researchDomains", label: "Main Research Domains" },
    { name: "contactPerson",   label: "Contact Person" },
  ],
  funding: [
    { name: "program",      label: "Funding Program Name" },
    { name: "email",        label: "Email" },
    { name: "organization", label: "Organization / Country" },
    { name: "fields",       label: "Research Fields Supported" },
    { name: "amount",       label: "Funding Amount Range" },
  ],
};

// ── Composants réutilisables ──────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-foreground mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function InputField({
  label, placeholder, type = "text", name, required, hasError,
}: {
  label: string; placeholder: string; type?: string;
  name: string; required?: boolean; hasError?: boolean;
}) {
  const borderClass = hasError
    ? "border-red-500 focus:ring-red-400"
    : "border-input focus:ring-ring";

  const baseClass = `w-full rounded-lg border ${borderClass} bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors`;

  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      {type === "textarea" ? (
        <textarea name={name} placeholder={placeholder} className={`${baseClass} min-h-[80px] resize-y`} />
      ) : (
        <input type={type} name={name} placeholder={placeholder} className={`${baseClass} h-11`} />
      )}
    </div>
  );
}

function CheckboxGroup({ label, options, name, required }: {
  label: string; options: string[]; name: string; required?: boolean;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-accent transition-colors">
            <input type="checkbox" name={name} value={opt} className="rounded border-input accent-primary" />
            <span className="text-foreground">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function SelectField({ label, options, name, required, hasError }: {
  label: string; options: string[]; name: string; required?: boolean; hasError?: boolean;
}) {
  const borderClass = hasError
    ? "border-red-500 focus:ring-red-400"
    : "border-input focus:ring-ring";
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <select name={name} className={`w-full rounded-lg border ${borderClass} bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 h-11 transition-colors`}>
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ── Bandeau d'erreurs ─────────────────────────────────────────────────────────

function ErrorBanner({ errors }: { errors: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3.5"
    >
      <div className="flex items-start gap-3">
        <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-red-500 mb-1.5">
            Please fill in all required fields:
          </p>
          <ul className="space-y-1">
            {errors.map((err) => (
              <li key={err} className="text-xs text-red-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                {err}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ── Sous-formulaires ──────────────────────────────────────────────────────────

function ResearcherForm({ ef }: { ef: string[] }) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField name="fullName" label="Full Name" placeholder="Dr. Jane Smith" required hasError={ef.includes("fullName")} />
        <InputField name="email"    label="Email"     placeholder="jane@university.edu" type="email" required hasError={ef.includes("email")} />
      </div>
      <InputField name="country"       label="Country"     placeholder="Morocco" required hasError={ef.includes("country")} />
      <InputField name="institution"   label="Institution / Position" placeholder="PhD Researcher at CNRS" required hasError={ef.includes("institution")} />
      <InputField name="researchField" label="Main Research Field + Keywords" placeholder="AI, NLP, Machine Learning" required hasError={ef.includes("researchField")} />
      <CheckboxGroup name="lookingFor" label="What are you looking for?" options={["Funding", "Collaboration", "Industry partnership"]} />
      <InputField name="publications"  label="Link to publications" placeholder="Google Scholar / ORCID / ResearchGate URL" />
    </div>
  );
}

function ProjectForm({ ef }: { ef: string[] }) {
  return (
    <div className="space-y-4">
      <SelectField name="orgType" label="Type" options={["Individual", "Organization"]} />
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField name="fullName" label="Full Name / Company Name" placeholder="Jane Smith or Acme Inc." required hasError={ef.includes("fullName")} />
        <InputField name="email"    label="Email" placeholder="contact@example.com" type="email" required hasError={ef.includes("email")} />
      </div>
      <InputField name="country"      label="Country"           placeholder="Morocco" required hasError={ef.includes("country")} />
      <InputField name="projectTitle" label="Project Title"     placeholder="AI-Powered Drug Discovery" required hasError={ef.includes("projectTitle")} />
      <InputField name="description"  label="Short Description" placeholder="Describe your innovation..." type="textarea" required hasError={ef.includes("description")} />
      <InputField name="sector"       label="Research Field / Sector" placeholder="Biotech, AI, Clean Energy..." required hasError={ef.includes("sector")} />
      <SelectField name="projectStage" label="Project Stage" options={["Idea", "Research", "Prototype"]} />
      <CheckboxGroup name="needs" label="What do you need?" options={["Funding", "Collaborators", "Industry partner"]} />
    </div>
  );
}

function CompanyForm({ ef }: { ef: string[] }) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField name="company" label="Company Name"    placeholder="Acme Innovation" required hasError={ef.includes("company")} />
        <InputField name="sector"  label="Industry Sector" placeholder="Pharma, Energy, AI..." required hasError={ef.includes("sector")} />
      </div>
      <InputField name="email"     label="Email" placeholder="contact@company.com" type="email" required hasError={ef.includes("email")} />
      <InputField name="challenge" label="Innovation Challenge" placeholder="What problem are you facing?" type="textarea" required hasError={ef.includes("challenge")} />
      <InputField name="researchDomain"     label="Research Domain Needed" placeholder="Materials Science, AI..." />
      <SelectField name="collaborationType" label="Collaboration Type" options={["Research partnership", "Consulting", "Technology scouting"]} />
      <InputField name="budget" label="Estimated Budget / Timeline" placeholder="€50K-100K / 6 months" />
    </div>
  );
}

function UniversityForm({ ef }: { ef: string[] }) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField name="institution" label="Institution Name" placeholder="MIT, Sorbonne..." required hasError={ef.includes("institution")} />
        <InputField name="country"     label="Country"          placeholder="Morocco" required hasError={ef.includes("country")} />
      </div>
      <InputField name="email"           label="Email" placeholder="contact@university.edu" type="email" required hasError={ef.includes("email")} />
      <InputField name="researchDomains" label="Main Research Domains" placeholder="AI, Biotech, Quantum..." required hasError={ef.includes("researchDomains")} />
      <InputField name="size" label="Number of Researchers / PhD Programs" placeholder="50 researchers, 12 PhD programs" />
      <CheckboxGroup name="interests" label="Collaboration Interests" options={["Industry partnerships", "Research projects"]} />
      <InputField name="contactPerson" label="Contact Person" placeholder="Prof. John Doe, john@uni.edu" required hasError={ef.includes("contactPerson")} />
    </div>
  );
}

function FundingForm({ ef }: { ef: string[] }) {
  return (
    <div className="space-y-4">
      <InputField name="program"      label="Funding Program Name"      placeholder="Horizon Europe, NSF Grant..." required hasError={ef.includes("program")} />
      <InputField name="email"        label="Email"                     placeholder="contact@funding.org" type="email" required hasError={ef.includes("email")} />
      <InputField name="organization" label="Organization / Country"    placeholder="European Commission, EU" required hasError={ef.includes("organization")} />
      <InputField name="fields"       label="Research Fields Supported" placeholder="AI, Health, Green Energy..." required hasError={ef.includes("fields")} />
      <InputField name="amount"       label="Funding Amount Range"      placeholder="€10K - €500K" required hasError={ef.includes("amount")} />
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField name="deadline" label="Application Deadline" placeholder="2026-06-30" type="date" />
        <InputField name="link"     label="Application Link"     placeholder="https://..." type="url" />
      </div>
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────

export default function OnboardingForm() {
  const [selected, setSelected]       = useState<ProfileType | null>("researcher");
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [errors, setErrors]           = useState<string[]>([]);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const { executeRecaptcha }          = useGoogleReCaptcha();
  const formRef                       = useRef<HTMLFormElement>(null);
  const errorRef                      = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected || !formRef.current) return;

    // ── Validation côté client ──
    const formData = new FormData(formRef.current);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const missingLabels: string[] = [];
    const missingNames: string[]  = [];

    requiredFields[selected].forEach(({ name, label }) => {
      const val = (formData.get(name) as string || "").trim();
      if (!val) {
        missingLabels.push(label);
        missingNames.push(name);
      } else if (name === "email" && !emailRegex.test(val)) {
        missingLabels.push("Email — invalid format");
        missingNames.push("email");
      }
    });

    if (missingLabels.length > 0) {
      setErrors(missingLabels);
      setErrorFields(missingNames);
      setTimeout(() => errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      return;
    }

    setErrors([]);
    setErrorFields([]);
    setLoading(true);

    // ── reCAPTCHA v3 ──
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready");
      setLoading(false);
      return;
    }
    const token = await executeRecaptcha("join_form");

    // ── Construction data ──
    const data: Record<string, unknown> = { profileType: selected, recaptchaToken: token };
    formData.forEach((value, key) => {
      if (key in data && key !== "profileType" && key !== "recaptchaToken") {
        const existing = data[key];
        data[key] = Array.isArray(existing)
          ? [...existing, value as string]
          : [existing as string, value as string];
      } else {
        data[key] = value;
      }
    });

    // ── Appel API ──
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "LP-Hub" }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        toast.error(err.error || "An error occurred.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }

    setLoading(false);
  };

  const handleSelectProfile = (key: ProfileType) => {
    setSelected(key);
    setErrors([]);
    setErrorFields([]);
  };

  // ── Succès ──
  if (submitted) {
    return (
      <section id="join-form" className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-2xl p-10 shadow-elevated text-center"
          >
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to ResearchGuide!</h3>
            <p className="text-muted-foreground">Thank you for joining. We'll be in touch soon.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="join-form" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-3">Join the Ecosystem</p>
          <p className="text-foreground font-bold">Be part of the next generation of research collaboration.</p>
          <p className="text-muted-foreground text-sm mt-2">
            Choose your profile and join the ecosystem to explore ResearchGuide and start shaping the future of science.
          </p>
        </motion.div>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated">
          {/* Step 1 */}
          <p className="text-sm font-medium text-muted-foreground mb-4">Step 1 — Select your profile type</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {profileTypes.map((pt) => (
              <motion.button
                key={pt.key}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectProfile(pt.key)}
                className={`group relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all min-h-[115px] cursor-pointer ${
                  selected === pt.key
                    ? "border-primary bg-primary/15"
                    : "border-border hover:border-primary/40 hover:bg-primary/10"
                }`}
              >
                <div className="flex flex-col items-center gap-2 transition-opacity group-hover:opacity-30">
                  <pt.Icon size={22} className={selected === pt.key ? "text-accent-foreground" : "text-muted-foreground"} />
                  <span className="text-xs font-medium text-foreground text-center leading-tight">{pt.label}</span>
                </div>
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to continue <ArrowDown size={12} />
                </span>
              </motion.button>
            ))}
          </div>

          {/* Step 2 */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <p className="text-sm font-medium text-muted-foreground mb-4">Step 2 — Fill in your details</p>

                  {/* ── Bandeau d'erreurs en haut ── */}
                  <div ref={errorRef}>
                    <AnimatePresence>
                      {errors.length > 0 && <ErrorBanner key="error-banner" errors={errors} />}
                    </AnimatePresence>
                  </div>

                  {/* Formulaire dynamique */}
                  {selected === "researcher" && <ResearcherForm ef={errorFields} />}
                  {selected === "project"    && <ProjectForm    ef={errorFields} />}
                  {selected === "company"    && <CompanyForm    ef={errorFields} />}
                  {selected === "university" && <UniversityForm ef={errorFields} />}
                  {selected === "funding"    && <FundingForm    ef={errorFields} />}

                  {/* Légende */}
                  <p className="text-xs text-muted-foreground mt-5">
                    <span className="text-red-500 font-bold">*</span> Required fields
                  </p>

                  {/* Submit */}
                  <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="mt-4">
                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Join ResearchGuide"}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}