import { Bell, Map, Calendar, BarChart3 } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { FeaturesSection } from "../components/pages/howitworks/FeaturesSection";
import { ContactSection } from "../components/pages/howitworks/ContactSection";
import { CTASection } from "../components/shared/CTASection";
import { ProcessTimeline } from "../components/pages/howitworks/ProcessTimeline";

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Cadastro na Plataforma",
      description:
        "Doadores, receptores e voluntários se cadastram na plataforma, informando seus dados e preferências.",
      features: [
        "Processo simples e rápido",
        "Verificação de segurança",
        "Perfis personalizados",
        "Configuração de preferências",
      ],
    },
    {
      number: "2",
      title: "Registro de Doações",
      description:
        "Doadores registram os alimentos disponíveis, informando tipo, quantidade, prazo de validade e horários para retirada.",
      icon: Bell,
      highlight: "Notificações em tempo real para receptores próximos",
    },
    {
      number: "3",
      title: "Solicitação e Agendamento",
      description:
        "Receptores visualizam doações disponíveis e solicitam os itens de interesse, agendando a retirada ou solicitando entrega.",
      icon: Calendar,
      highlight: "Sistema de agendamento inteligente para otimizar o processo",
    },
    {
      number: "4",
      title: "Logística e Entrega",
      description:
        "Voluntários de logística visualizam rotas disponíveis e se oferecem para realizar o transporte entre doadores e receptores.",
      icon: Map,
      highlight:
        "Mapa interativo com rotas otimizadas para entregas eficientes",
    },
    {
      number: "5",
      title: "Confirmação e Feedback",
      description:
        "Após a entrega, o sistema registra a conclusão da doação e solicita feedback de todas as partes envolvidas.",
      icon: BarChart3,
      highlight:
        "Relatórios de impacto social e ambiental para todos os participantes",
    },
  ];

  return (
    <>
      <PageHeader
        title="Como Funciona"
        subtitle="Entenda como nossa plataforma conecta doadores, receptores e voluntários para reduzir o desperdício de alimentos e combater a fome."
      />

      <ProcessTimeline steps={steps} />

      <FeaturesSection />

      <CTASection
        title="Pronto para começar?"
        subtitle="Junte-se à nossa plataforma e faça parte da solução para reduzir o desperdício de alimentos e combater a fome."
        buttons={[
          { label: "Cadastre-se agora", href: "/cadastro", variant: "white" },
          { label: "Saiba mais", href: "/sobre", variant: "outline" },
        ]}
      />

      <ContactSection />
    </>
  );
}
