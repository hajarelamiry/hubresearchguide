import { NextRequest, NextResponse } from 'next/server';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function e(val: unknown) {
  return escapeHtml(String(val || "").trim());
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 12px;font-weight:600;color:#555;width:160px;border-bottom:1px solid #f0f0f0;">${label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#111;">${value}</td>
    </tr>`;
}

function buildHtml(title: string, emoji: string, rows: string) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
      <h2 style="margin:0 0 20px;font-size:18px;color:#111;">${emoji} ${title}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows}
        ${row("Date", new Date().toLocaleString('fr-FR'))}
      </table>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileType, recaptchaToken } = body;

    // ── reCAPTCHA ──────────────────────────────────────────────
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA manquant" }, { status: 400 });
    }
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const verifyData = await verifyRes.json();
    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json({ error: "reCAPTCHA invalide" }, { status: 400 });
    }
    // ── Validation email basique ───────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = e(body.email);
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // ── Construction email selon profileType ──────────────────
    let subject = "";
    let html = "";

    switch (profileType) {

      case "researcher": {
        const name        = e(body.fullName);
        const country     = e(body.country);
        const institution = e(body.institution);
        const field       = e(body.researchField);
        const looking     = Array.isArray(body.lookingFor)
          ? body.lookingFor.map(e).join(", ")
          : e(body.lookingFor);
        const publications = e(body.publications);

        if (!name) return NextResponse.json({ error: "Nom requis" }, { status: 400 });

        subject = `🔬 Nouveau Researcher — ${name}`;
        html = buildHtml("Nouvelle inscription Researcher / Expert", "🔬",
          row("Nom",              name) +
          row("Email",            `<a href="mailto:${email}">${email}</a>`) +
          row("Pays",             country) +
          row("Institution",      institution) +
          row("Domaine / Mots-clés", field) +
          row("Recherche",        looking) +
          row("Publications",     publications || "—")
        );
        break;
      }

      case "project": {
        const name        = e(body.fullName);
        const orgType     = e(body.orgType);
        const country     = e(body.country);
        const title       = e(body.projectTitle);
        const description = e(body.description);
        const sector      = e(body.sector);
        const stage       = e(body.projectStage);
        const needs       = Array.isArray(body.needs)
          ? body.needs.map(e).join(", ")
          : e(body.needs);

        if (!name || !title) return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });

        subject = `💡 Nouveau Projet — ${title}`;
        html = buildHtml("Nouvelle inscription Projet / Innovation", "💡",
          row("Nom / Organisation", name) +
          row("Email",              `<a href="mailto:${email}">${email}</a>`) +
          row("Type",               orgType) +
          row("Pays",               country) +
          row("Titre du projet",    title) +
          row("Description",        description) +
          row("Secteur",            sector) +
          row("Stade",              stage) +
          row("Besoins",            needs)
        );
        break;
      }

      case "company": {
        const company   = e(body.company);
        const sector    = e(body.sector);
        const challenge = e(body.challenge);
        const domain    = e(body.researchDomain);
        const collab    = e(body.collaborationType);
        const budget    = e(body.budget);

        if (!company) return NextResponse.json({ error: "Nom entreprise requis" }, { status: 400 });

        subject = `🏢 Nouvelle Entreprise — ${company}`;
        html = buildHtml("Nouvelle inscription Entreprise / Industrie", "🏢",
          row("Entreprise",          company) +
          row("Email",               `<a href="mailto:${email}">${email}</a>`) +
          row("Secteur",             sector) +
          row("Défi innovation",     challenge) +
          row("Domaine recherche",   domain) +
          row("Type collaboration",  collab) +
          row("Budget / Délai",      budget || "—")
        );
        break;
      }

      case "university": {
        const institution = e(body.institution);
        const country     = e(body.country);
        const domains     = e(body.researchDomains);
        const size        = e(body.size);
        const interests   = Array.isArray(body.interests)
          ? body.interests.map(e).join(", ")
          : e(body.interests);
        const contact     = e(body.contactPerson);

        if (!institution) return NextResponse.json({ error: "Nom institution requis" }, { status: 400 });

        subject = `🎓 Nouvelle Université — ${institution}`;
        html = buildHtml("Nouvelle inscription Université / Labo", "🎓",
          row("Institution",         institution) +
          row("Email",               `<a href="mailto:${email}">${email}</a>`) +
          row("Pays",                country) +
          row("Domaines",            domains) +
          row("Chercheurs / PhD",    size) +
          row("Intérêts",            interests) +
          row("Contact",             contact)
        );
        break;
      }

      case "funding": {
        const program  = e(body.program);
        const org      = e(body.organization);
        const fields   = e(body.fields);
        const amount   = e(body.amount);
        const deadline = e(body.deadline);
        const link     = e(body.link);

        if (!program) return NextResponse.json({ error: "Nom programme requis" }, { status: 400 });

        subject = `💰 Nouveau Financement — ${program}`;
        html = buildHtml("Nouvelle inscription Funding Provider", "💰",
          row("Programme",           program) +
          row("Email",               `<a href="mailto:${email}">${email}</a>`) +
          row("Organisation / Pays", org) +
          row("Domaines financés",   fields) +
          row("Montant",             amount) +
          row("Deadline",            deadline) +
          row("Lien candidature",    link ? `<a href="${link}">${link}</a>` : "—")
        );
        break;
      }

      default:
        return NextResponse.json({ error: "Profile type invalide" }, { status: 400 });
    }

    // ── Envoi email ───────────────────────────────────────────
    const { error: sendError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.RECIPIENT_EMAIL!,
      replyTo: email,
      subject,
      html,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}