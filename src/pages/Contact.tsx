import { PageHeader } from "../components/shared/PageHeader";
import { ContactInfo } from "../components/shared/ContactInfo";
import { FAQAccordion } from "../components/shared/FAQAccordion";
import { CTASection } from "../components/shared/CTASection";
import { ContactForm } from "../components/forms/ContactForm";

export function Contact() {
  const faqItems = [
    {
      id: "1",
      title: "Como posso me tornar um doador?",
      content:
        "Para se tornar um doador, basta se cadastrar em nossa plataforma, informar os dados do seu estabelecimento e começar a registrar os alimentos disponíveis para doação. O processo é simples, rápido e sem burocracia.",
    },
    {
      id: "2",
      title: "Quais tipos de alimentos posso doar?",
      content:
        "Você pode doar alimentos não perecíveis dentro do prazo de validade, frutas, verduras e legumes em bom estado, alimentos preparados no mesmo dia (seguindo normas de segurança alimentar) e outros itens em condições adequadas para consumo.",
    },
    {
      id: "3",
      title: "Como funciona o processo de entrega?",
      content:
        "Após o registro da doação, os receptores próximos são notificados e podem solicitar os itens. A entrega pode ser feita diretamente pelo doador, pelo receptor (que busca no local) ou por um voluntário de logística cadastrado em nossa plataforma.",
    },
    {
      id: "4",
      title: "Quem pode receber as doações?",
      content:
        "ONGs, projetos sociais, abrigos, comunidades carentes e outras instituições que atendam pessoas em situação de vulnerabilidade podem se cadastrar como receptores. Todas as instituições passam por um processo de verificação para garantir a segurança do sistema.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Entre em Contato"
        subtitle="Estamos aqui para responder suas dúvidas e ouvir suas sugestões. Preencha o formulário abaixo para entrar em contato conosco."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Fale Conosco
              </h2>
              <p className="text-gray-700 mb-8">
                Queremos ouvir você! Seja para tirar dúvidas, fazer sugestões ou
                se tornar um parceiro, estamos à disposição para ajudar.
              </p>
              <ContactInfo />
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-700 mt-2">
              Respostas para as dúvidas mais comuns
            </p>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <CTASection
        title="Pronto para fazer a diferença?"
        subtitle="Junte-se a nós nessa missão de reduzir o desperdício de alimentos e combater a fome."
        buttons={[
          { label: "Cadastre-se agora", href: "/cadastro", variant: "white" },
        ]}
      />
    </>
  );
}
