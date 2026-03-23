import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FlaskConical, Lightbulb, Building, GraduationCap, DollarSign, CheckCircle2, ArrowDown, type LucideIcon } from "lucide-react";


type ProfileType = "researcher" | "project" | "company" | "university" | "funding";

const profileTypes: {key: ProfileType;label: string;Icon: LucideIcon;}[] = [
{ key: "researcher", label: "Researcher / Expert", Icon: FlaskConical },
{ key: "project", label: "Project / Innovation", Icon: Lightbulb },
{ key: "company", label: "Company / Industry", Icon: Building },
{ key: "university", label: "University / Lab", Icon: GraduationCap },
{ key: "funding", label: "Funding Provider", Icon: DollarSign }];


function InputField({ label, placeholder, type = "text" }: {label: string;placeholder: string;type?: string;}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      {type === "textarea" ?
      <textarea
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px] resize-y" /> :


      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11" />

      }
    </div>);

}

function CheckboxGroup({ label, options }: {label: string;options: string[];}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) =>
        <label key={opt} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-accent transition-colors">
            <input type="checkbox" className="rounded border-input accent-primary" />
            <span className="text-foreground">{opt}</span>
          </label>
        )}
      </div>
    </div>);

}

function SelectField({ label, options }: {label: string;options: string[];}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11">
        <option value="">Select...</option>
        {options.map((o) =>
        <option key={o} value={o}>{o}</option>
        )}
      </select>
    </div>);

}

function ResearcherForm() {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Full Name" placeholder="Dr. Jane Smith" />
        <InputField label="Email" placeholder="jane@university.edu" type="email" />
      </div>
      <InputField label="Country" placeholder="Morocco" />
      <InputField label="Institution / Position" placeholder="PhD Researcher at CNRS" />
      <InputField label="Main Research Field + Keywords" placeholder="AI, NLP, Machine Learning" />
      <CheckboxGroup label="What are you looking for?" options={["Funding", "Collaboration", "Industry partnership"]} />
      <InputField label="Link to publications" placeholder="Google Scholar / ORCID / ResearchGate URL" />
    </div>);

}

function ProjectForm() {
  return (
    <div className="space-y-4">
      <SelectField label="Type" options={["Individual", "Organization"]} />
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Full Name / Company Name" placeholder="Jane Smith or Acme Inc." />
        <InputField label="Email" placeholder="contact@example.com" type="email" />
      </div>
      <InputField label="Country" placeholder="Morocco" />
      <InputField label="Project Title" placeholder="AI-Powered Drug Discovery" />
      <InputField label="Short Description" placeholder="Describe your innovation..." type="textarea" />
      <InputField label="Research Field / Sector" placeholder="Biotech, AI, Clean Energy..." />
      <SelectField label="Project Stage" options={["Idea", "Research", "Prototype"]} />
      <CheckboxGroup label="What do you need?" options={["Funding", "Collaborators", "Industry partner"]} />
    </div>);

}

function CompanyForm() {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Company Name" placeholder="Acme Innovation" />
        <InputField label="Industry Sector" placeholder="Pharma, Energy, AI..." />
      </div>
      <InputField label="Innovation Challenge" placeholder="What problem are you facing?" type="textarea" />
      <InputField label="Research Domain Needed" placeholder="Materials Science, AI..." />
      <SelectField label="Collaboration Type" options={["Research partnership", "Consulting", "Technology scouting"]} />
      <InputField label="Estimated Budget / Timeline" placeholder="€50K-100K / 6 months" />
    </div>);

}

function UniversityForm() {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Institution Name" placeholder="MIT, Sorbonne..." />
        <InputField label="Country" placeholder="Morocco" />
      </div>
      <InputField label="Main Research Domains" placeholder="AI, Biotech, Quantum..." />
      <InputField label="Number of Researchers / PhD Programs" placeholder="50 researchers, 12 PhD programs" />
      <CheckboxGroup label="Collaboration Interests" options={["Industry partnerships", "Research projects"]} />
      <InputField label="Contact Person" placeholder="Prof. John Doe, john@uni.edu" />
    </div>);

}

function FundingForm() {
  return (
    <div className="space-y-4">
      <InputField label="Funding Program Name" placeholder="Horizon Europe, NSF Grant..." />
      <InputField label="Organization / Country" placeholder="European Commission, EU" />
      <InputField label="Research Fields Supported" placeholder="AI, Health, Green Energy..." />
      <InputField label="Funding Amount Range" placeholder="€10K - €500K" />
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Application Deadline" placeholder="2026-06-30" type="date" />
        <InputField label="Application Link" placeholder="https://..." type="url" />
      </div>
    </div>);

}

const formMap: Record<ProfileType, React.FC> = {
  researcher: ResearcherForm,
  project: ProjectForm,
  company: CompanyForm,
  university: UniversityForm,
  funding: FundingForm
};

export default function OnboardingForm() {
  const [selected, setSelected] = useState<ProfileType | null>("researcher");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section id="join-form" className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-2xl p-10 shadow-elevated text-center">
            
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to the Ecosystem!</h3>
            <p className="text-muted-foreground">
              Thank you for joining ResearchGuide. We'll be in touch soon.
            </p>
          </motion.div>
        </div>
      </section>);

  }

  const FormComponent = selected ? formMap[selected] : null;

  return (
    <section id="join-form" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10">
          
          <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-3">Join the Ecosystem</p>
          <p className="text-foreground font-bold">
            Be part of the next generation of research collaboration.
          </p>
          <p className="text-muted-foreground text-sm mt-2">Choose your profile and join the ecosystem to explore ResearchGuide and start shaping the future of science.

          </p>
        </motion.div>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated">
          <p className="text-sm font-medium text-muted-foreground mb-4">Step 1 — Select your profile type</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {profileTypes.map((pt) =>
            <motion.button
              key={pt.key}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(pt.key)}
              className={`group relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all min-h-[115px] cursor-pointer ${
              selected === pt.key ?
              "border-primary bg-primary/15" :
              "border-border hover:border-primary/40 hover:bg-primary/10"}`
              }>
              
              <div className="flex flex-col items-center gap-2 transition-opacity group-hover:opacity-30">
                <pt.Icon size={22} className={selected === pt.key ? "text-accent-foreground" : "text-muted-foreground"} />
                <span className="text-xs font-medium text-foreground text-center leading-tight">{pt.label}</span>
              </div>
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Click to continue <ArrowDown size={12} />
              </span>
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {FormComponent &&
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}>
              
                <p className="text-sm font-medium text-muted-foreground mb-4">Step 2 — Fill in your details</p>
                <FormComponent />
                <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="mt-6">
                  <Button variant="hero" size="lg" className="w-full" onClick={() => setSubmitted(true)}>
                    Join ResearchGuide
                  </Button>
                </motion.div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </section>);

}