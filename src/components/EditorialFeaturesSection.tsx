import SectionHeading from "@/components/SectionHeading";
import CreateButton from "@/components/CreateButton";
import EditorialGrid from "@/components/EditorialGrid";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.";

/** The lead slot is the exclusive placement; the rest are ordinary features. */
const CARDS = [
  { eyebrow: "Exclusive", title: "Multipocket Tote Bag", description: LOREM },
  ...Array.from({ length: 7 }, () => ({
    eyebrow: "Featured",
    title: "Multipocket Tote Bag",
    description: LOREM,
  })),
];

export default function EditorialFeaturesSection() {
  return (
    <section className="bg-white flex flex-col gap-[48px] items-start px-[120px] py-[64px] w-[1440px] overflow-hidden">
      <SectionHeading
        title="Editorial Features"
        action={<CreateButton href="/promote/editorial-feature" />}
      />

      <EditorialGrid
        cards={CARDS}
        columnsClass="grid grid-cols-4 gap-x-[16px] gap-y-[48px] w-full"
        brand="Acne Studios"
      />
    </section>
  );
}
