import { CTASection } from "../components/shared/CTASection";
import { MissionSection } from "../components/pages/about/MissionSection";
import { ProblemSection } from "../components/pages/about/ProblemSection";
import { TargetAudienceSection } from "../components/pages/about/TargetAudienceSection";
import { PageHeader } from "../components/shared/PageHeader";

export function About() {
  return (
    <>
      <PageHeader
        title="Sobre o Prato Amigo"
        subtitle="Conheça nossa missão de conectar doadores e receptores para reduzir o desperdício de alimentos e combater a fome."
      />

      <MissionSection />

      <ProblemSection />

      <TargetAudienceSection />

      <CTASection
        title="Junte-se a nós nessa missão"
        subtitle="Faça parte da solução para reduzir o desperdício de alimentos e combater a fome."
        buttons={[
          { label: "Entre em contato", href: "/contato", variant: "white" },
        ]}
      />
    </>
  );
}
