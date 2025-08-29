import { PageHeader } from "../components/shared/PageHeader";
import { RegisterForm } from "../components/forms/RegisterForm";
import { Users, Heart, Leaf, Shield, Clock } from "lucide-react";

export function Register() {
  const benefits = [
    {
      icon: Users,
      title: "Conecte-se com a Comunidade",
      description:
        "Faça parte de uma rede de pessoas comprometidas com a solidariedade e sustentabilidade.",
    },
    {
      icon: Heart,
      title: "Ajude Quem Precisa",
      description:
        "Contribua para reduzir a fome e o desperdício de alimentos em sua região.",
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description:
        "Participe de uma iniciativa que promove o consumo consciente e responsável.",
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description:
        "Seus dados estão protegidos e todas as transações são seguras e confiáveis.",
    },
    {
      icon: Clock,
      title: "Processo Rápido",
      description:
        "Cadastro simples e rápido, você pode começar a ajudar em poucos minutos.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Junte-se ao Prato Amigo"
        subtitle="Faça parte da nossa rede de solidariedade e ajude a reduzir o desperdício de alimentos."
      />
      {/* 
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que se cadastrar?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra como você pode fazer a diferença na vida de muitas
              pessoas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Crie sua conta agora
            </h2>
            <p className="text-lg text-gray-600">
              Preencha o formulário abaixo e comece sua jornada de solidariedade
            </p>
          </div>

          <RegisterForm />

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-700 font-medium underline"
              >
                Faça login aqui
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-600 mb-2">
                1.2k+
              </div>
              <div className="text-gray-600">Usuários cadastrados</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-600 mb-2">
                5.8k+
              </div>
              <div className="text-gray-600">Refeições compartilhadas</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-600 mb-2">2.1t</div>
              <div className="text-gray-600">
                Alimentos salvos do desperdício
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
