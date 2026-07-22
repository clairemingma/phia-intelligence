"use client";
import { useState } from "react";

const FIELDS = [
  { id: "firstName", label: "First name*", type: "text" },
  { id: "lastName",  label: "Last name*",  type: "text" },
  { id: "email",     label: "Work email*", type: "email" },
  { id: "company",   label: "Company name*", type: "text" },
  { id: "message",   label: "Tell us what you're looking for", type: "text" },
] as const;

type FieldId = typeof FIELDS[number]["id"];

function FloatingInput({
  id,
  label,
  type,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0;

  return (
    <div className="relative h-[60px] w-full shrink-0">
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="absolute inset-0 w-full h-[60px] bg-white rounded-[6px] outline-none px-[13px] pt-[24px] pb-[8px] text-[16px] leading-[28px] tracking-[0.16px] text-[#0c0a08] transition-colors"
        style={{
          fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif",
          fontWeight: 400,
          border: `1px solid ${focused ? "#000" : "#d2cecb"}`,
        }}
        placeholder=""
      />
      <label
        htmlFor={id}
        className="absolute left-[14px] pointer-events-none transition-all duration-150"
        style={{
          fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif",
          fontWeight: 400,
          ...(floating
            ? {
                top: "7px",
                fontSize: "12px",
                lineHeight: "18px",
                letterSpacing: "0.24px",
                color: "rgba(12,10,8,0.6)",
              }
            : {
                top: "16px",
                fontSize: "16px",
                lineHeight: "28px",
                letterSpacing: "0.16px",
                color: "rgba(12,10,8,0.6)",
              }),
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactSection() {
  const [values, setValues] = useState<Record<FieldId, string>>({
    firstName: "",
    lastName:  "",
    email:     "",
    company:   "",
    message:   "",
  });

  return (
    <div className="flex flex-col items-start px-[120px] py-[96px] w-full">
      <div className="flex flex-col gap-[64px] items-start w-full">

        {/* Heading */}
        <div className="flex flex-col gap-[12px] items-center w-full">
          <p
            className="text-[56px] leading-[1.1] tracking-[-2.24px] text-[#292929] whitespace-nowrap"
            style={{
              fontFamily: "var(--font-gt-super-display), 'Playfair Display', Georgia, serif",
              fontWeight: 300,
            }}
          >
            Get in touch
          </p>
          <p
            className="text-[16px] leading-[20px] text-[#6b7280] text-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif",
              fontWeight: 400,
            }}
          >
            {"Or email us directly at "}
            <span className="underline underline-offset-auto decoration-solid">
              partners@phia.com
            </span>
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col items-center w-full">
          <form
            className="flex flex-col gap-[24px] items-start w-[800px]"
            onSubmit={e => e.preventDefault()}
          >
            {FIELDS.map(({ id, label, type }) => (
              <FloatingInput
                key={id}
                id={id}
                label={label}
                type={type}
                value={values[id]}
                onChange={v => setValues(prev => ({ ...prev, [id]: v }))}
              />
            ))}

            <button
              type="submit"
              className="flex h-[48px] items-center justify-center px-[20px] bg-black rounded-full shrink-0"
            >
              <span
                className="text-[14px] text-white whitespace-nowrap tracking-[-0.2335px]"
                style={{
                  fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif",
                  fontWeight: 500,
                  lineHeight: "11.673px",
                }}
              >
                Get in Touch
              </span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
