"use client";

import { useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import FloatingTextarea from "@/components/FloatingTextarea";
import DateField from "@/components/DateField";
import SocialPostPreview from "@/components/SocialPostPreview";
import PromoteFlowShell, {
  FlowSubmitButton,
  useFlowSubmit,
} from "@/components/PromoteFlowShell";

const SUBTITLE =
  "Surface your social posts and creator content alongside your products.";

/**
 * The social placement is the open-ended one: there is no artwork to compose
 * and no products to choose, so the form asks what the brand is after and the
 * preview shows where the post would run.
 */
export default function SocialFeatureFlow() {
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [budget, setBudget] = useState("");
  const [postDate, setPostDate] = useState("");
  const { submit, overlay } = useFlowSubmit();

  return (
    <PromoteFlowShell
      title="Social Feature"
      subtitle={SUBTITLE}
      crumbHref="/promote"
      // A fixed sample of where the post would run. Unlike the editorial and
      // outfit previews, nothing here tracks the form: Phia produces the post,
      // so the brief is not its caption.
      preview={
        <SocialPostPreview />
      }
    >
      <form
        className="flex w-full flex-col items-start gap-[24px]"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <FloatingInput id="social-title" label="Title*" value={title} onChange={setTitle} />

        {/* This placement has no set shape, so the prompt asks rather than
            labels — "Description" gave the brand nothing to aim at. */}
        <FloatingTextarea
          id="social-brief"
          label="Tell us what you're looking for*"
          value={brief}
          onChange={setBrief}
          rows={5}
        />

        <FloatingInput
          id="social-budget"
          label="Budget*"
          value={budget}
          onChange={setBudget}
          prefix="$"
        />

        <DateField
          id="social-post-date"
          label="Post date"
          value={postDate}
          onChange={setPostDate}
        />

        <FlowSubmitButton />
      </form>

      {overlay}
    </PromoteFlowShell>
  );
}
