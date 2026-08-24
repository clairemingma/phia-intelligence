import SectionHeading from "@/components/SectionHeading";
import CreateButton from "@/components/CreateButton";
import PromoRow, { type Promo } from "@/components/PromoRow";
import StackedSection from "@/components/StackedSection";

const PROMOS: Promo[] = [
  {
    amount: "20%",
    unit: "Off",
    title: "Extra 20% off full-price Acne Studios — sitewide",
    meta: "841 shoppers saved with this code in the last 24 hours",
    code: "ACNE20",
    featured: true,
  },
  {
    amount: "15%",
    unit: "Off",
    title: "15% off your order when you spend $300+",
    meta: "312 interested users tried this code today",
    code: "ACNE15",
  },
  {
    amount: "$50",
    unit: "Off",
    title: "$50 off your first order over $400",
    meta: "128 new customers used this welcome offer this week",
    code: "WELCOME50",
  },
  {
    amount: "Free",
    unit: "Ship",
    title: "Free standard shipping on orders $250 and up",
    meta: "574 checkouts applied free shipping today",
    code: "FREESHIP",
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
