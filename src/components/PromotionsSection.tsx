import SectionHeading from "@/components/SectionHeading";
import CreateButton from "@/components/CreateButton";
import PromoRow, { type Promo } from "@/components/PromoRow";
import StackedSection from "@/components/StackedSection";

const PROMOS: Promo[] = [
  {
    amount: "20%",
    unit: "Off",
    title: "20% off full-price denim",
    meta: "841 shoppers saved with this code today",
    code: "PHIA20",
    featured: true,
  },
];

export default function PromotionsSection({ stackIndex }: { stackIndex: number }) {
  return (
    <StackedSection index={stackIndex}>
      <SectionHeading
        title="Promotional Codes"
        action={<CreateButton href="/promote/promotional-code" />}
      />

      <div className="flex flex-col gap-[24px] items-start w-full">
        {PROMOS.map((promo) => (
          <PromoRow key={promo.code} promo={promo} />
        ))}
      </div>
    </StackedSection>
  );
}
