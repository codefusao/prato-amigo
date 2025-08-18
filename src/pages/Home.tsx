import { Leaf, Users, Truck } from "lucide-react";
import { VideoBanner } from "../components/shared/VideoBanner";
import { StatsGrid } from "../components/shared/StatsGrid";
import { FeatureGrid } from "../components/shared/FeatureGrid";
import { CTASection } from "../components/shared/CTASection";
import { Hero } from "../components/pages/home/Hero";
import { ImpactSection } from "../components/pages/home/ImpactSection";

export function Home() {
  const stats = [
    {
      value: "27M",
      description: "Toneladas de alimentos desperdiçados anualmente no Brasil",
    },
    { value: "700M", description: "Pessoas passando fome no mundo em 2023" },
    {
      value: "1/3",
      description:
        "De todos os alimentos produzidos globalmente é desperdiçado",
    },
  ];

  const features = [
    {
      icon: Leaf,
      title: "Doadores",
      subtitle: "Restaurantes, padarias, supermercados e feiras",
      description: "Cadastre seus alimentos excedentes em boas condições e agende a retirada de forma rápida e sem burocracia.",
      linkText: "Saiba mais",
      linkHref: "/como-funciona",
    },
    {
      icon: Users,
      title: "Receptores",
      subtitle: "ONGs, projetos sociais e comunidades",
      description: "Receba alimentos de forma constante, segura e organizada, com previsibilidade para melhor planejamento.",
      linkText: "Saiba mais",
      linkHref: "/como-funciona",
    },
    {
      icon: Truck,
      title: "Voluntários",
      subtitle: "Motoristas e entregadores voluntários",
      description: "Ajude no transporte das doações, conectando-se com doadores e receptores através da nossa plataforma.",
      linkText: "Saiba mais",
      linkHref: "/como-funciona",
    },
  ];

  return (
    <>
      <VideoBanner
        title="Conheça nosso projeto em vídeo: Veja como o Prato Amigo está transformando vidas!"
        videoUrl="https://youtu.be/uHmXTjzJGRw"
      />

      <Hero />

      <StatsGrid stats={stats} />

      <FeatureGrid
        features={features}
        title="Como Funciona"
        subtitle="Uma plataforma simples e eficiente para conectar quem doa e quem recebe"
      />

      <ImpactSection />

      <CTASection
        title="Faça parte dessa transformação"
        subtitle="Junte-se a nós para reduzir o desperdício de alimentos e ajudar quem mais precisa."
        buttons={[
          { label: "Quero doar", href: "/cadastro", variant: "white" },
          { label: "Quero receber", href: "/cadastro", variant: "outline" },
          { label: "Quero ser voluntário", href: "/cadastro", variant: "outline" },
        ]}
      />
    </>
  );
}
