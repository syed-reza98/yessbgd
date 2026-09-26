import { PageHero } from "@/components/PageHero";
import { VenturesDirectory } from "@/components/VenturesDirectory";

export const metadata = {
  title: "Ventures Directory | YESS Bangladesh",
  description:
    "Explore the 13 sovereign subsidiaries of YESS Bangladesh spanning software engineering, media streaming, agritech IoT, and logistics.",
};

export default function VenturesPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="CONGLOMERATE PORTFOLIO"
        title="Our Ventures Ecosystem"
        subtitle="13 sovereign business units and digital infrastructure platforms architected, owned, and operated across Bangladesh."
      />

      <section className="py-16 bg-background">
        <div className="container-tight">
          <VenturesDirectory />
        </div>
      </section>
    </div>
  );
}
