"use client";

import { useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import PromoteFlowShell, {
  FlowSubmitButton,
  useFlowSubmit,
} from "@/components/PromoteFlowShell";

/**
 * The plain placement request — a title, a description and a budget. Shared by
 * the outfit and social flows, which differ only in what they are called.
 *
 * The preview field beside the form is deliberately empty: these placements
 * have no shopper-facing artwork to mock up yet, so the field holds its space
 * rather than letting the form sprawl across the page.
 */
export default function FeatureRequestFlow({
  title,
  subtitle,
  idPrefix,
}: {
  title: string;
  subtitle: string;
  /** Namespaces the field ids so labels bind to the right input. */
  idPrefix: string;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const submit = useFlowSubmit();

  return (
    <PromoteFlowShell title={title} subtitle={subtitle} crumbHref="/promote" preview={null}>
      <form
        className="flex w-full flex-col gap-[24px] items-start"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <FloatingInput
          id={`${idPrefix}-title`}
          label="Title*"
          value={name}
          onChange={setName}
        />
        <FloatingInput
          id={`${idPrefix}-description`}
          label="Description*"
          value={description}
          onChange={setDescription}
        />
        <FloatingInput
          id={`${idPrefix}-budget`}
          label="Budget*"
          value={budget}
          onChange={setBudget}
          prefix="$"
        />

        <FlowSubmitButton />
      </form>
    </PromoteFlowShell>
  );
}
