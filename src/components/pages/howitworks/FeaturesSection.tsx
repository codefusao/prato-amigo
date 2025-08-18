import { CheckCircle, Bell, Map, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent } from "../../ui/Card";

export function FeaturesSection() {
  const features = [
    {
      icon: Bell,
      title: "Notificações em Tempo Real",
      description:
        "Receba alertas instantâneos sobre novas doações disponíveis, solicitações e confirmações de entrega.",
    },
    {
      icon: Map,
      title: "Mapa Interativo",
      description:
        "Visualize doadores, receptores e rotas de entrega em um mapa interativo para facilitar a logística.",
    },
    {
      icon: Calendar,
      title: "Gestão de Agendamentos",
      description:
        "Sistema inteligente de agendamento para otimizar retiradas e entregas, evitando conflitos.",
    },
    {
      icon: CheckCircle,
      title: "Controle de Qualidade",
      description:
        "Verificação de segurança alimentar e controle de qualidade para garantir doações adequadas.",
    },
    {
      icon: BarChart3,
      title: "Relatórios de Impacto",
      description:
        "Acompanhe o impacto social e ambiental das suas doações com relatórios detalhados.",
    },
    {
      icon: CheckCircle,
      title: "Sistema de Feedback",
      description:
        "Avaliações e comentários para melhorar continuamente a experiência de todos os usuários.",
    },
  ];

  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">
            Funcionalidades Principais
          </h2>
          <p className="text-gray-700 mt-2">
            Recursos que tornam nossa plataforma eficiente e fácil de usar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


