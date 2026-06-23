import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 4;
const DEFAULT_CONTACT_EMAIL_TO = "nikoonavid@yahoo.com";
const hits = new Map<string, { count: number; resetAt: number }>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
};

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validate(payload: ContactPayload) {
  const name = asString(payload.name);
  const email = asString(payload.email).toLowerCase();
  const subject = asString(payload.subject);
  const message = asString(payload.message);
  const company = asString(payload.company);

  if (company) {
    return { ok: false as const, message: "Spam detected." };
  }

  if (name.length < 2 || name.length > 80) {
    return { ok: false as const, message: "Please enter your name." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return { ok: false as const, message: "Please enter a valid email." };
  }

  if (subject.length > 120) {
    return { ok: false as const, message: "Subject is too long." };
  }

  if (message.length < 10 || message.length > 4_000) {
    return {
      ok: false as const,
      message: "Please write a message between 10 and 4,000 characters.",
    };
  }

  return { ok: true as const, data: { name, email, subject, message } };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.trim() || DEFAULT_CONTACT_EMAIL_TO;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "Missing RESEND_API_KEY. Add RESEND_API_KEY in .env.local, then restart the dev server.",
      },
      { status: 500 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many messages. Please try again in a minute." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = validate(payload);
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  const { name, email, subject, message } = result.data;
  const timestamp = new Date().toISOString();
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject || "General inquiry"),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
    timestamp: escapeHtml(timestamp),
  };

  const resend = new Resend(apiKey);
  const emailSubject = `S-Tier contact: ${subject || "General inquiry"}`;

  const text = [
    "New S-Tier contact",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject || "General inquiry"}`,
    `Timestamp: ${timestamp}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    await resend.emails.send({
      from: "S-Tier Contact <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: emailSubject,
      text,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;background:#0b0b0b;color:#f5f5f5;padding:32px;border-radius:16px">
          <p style="margin:0 0 16px;color:#c0c0c0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase">S-Tier contact</p>
          <h1 style="margin:0 0 24px;font-size:24px;line-height:1.2">${safe.subject}</h1>
          <div style="border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;background:#141414">
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Timestamp:</strong> ${safe.timestamp}</p>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:20px 0" />
            <p style="line-height:1.65;color:#d5d5d5">${safe.message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent." });
  } catch (err: unknown) {
    const detail =
      err instanceof Error && err.message ? err.message : "Unknown error";
    console.error("[api/contact]", detail);
    return NextResponse.json(
      { message: `Email could not be sent: ${detail}` },
      { status: 502 },
    );
  }
}
