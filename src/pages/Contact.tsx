import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PageHeader } from "../components/shared/PageHeader";
import { ContactInfo } from "../components/shared/ContactInfo";
import { FAQAccordion } from "../components/shared/FAQAccordion";
import { CTASection } from "../components/shared/CTASection";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { contactSchema, type ContactFormData } from "../schemas/contact";
import { createPhoneHandler } from "../lib/formUtils";
import { contactTypeOptions } from "../data/constants";

export function Contact() {
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = () => {
    toast.success(
      "Mensagem enviada com sucesso! Entraremos em contato em breve."
    );
    reset();
    setCharCount(0);
  };

  const handlePhoneChange = createPhoneHandler(setValue, "phone");

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

            <div className="bg-white rounded-xl border border-green-100 shadow-lg">
              <div className="p-6 pb-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Formulário de Contato
                </h3>
                <p className="text-gray-600 mb-6">
                  Preencha todos os campos obrigatórios para enviar sua
                  mensagem
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label="Nome completo"
                    {...register("name")}
                    error={errors.name?.message}
                    required
                  />

                  <Input
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                    required
                  />

                  <Input
                    label="Telefone"
                    {...register("phone")}
                    onChange={handlePhoneChange}
                    placeholder="(XX) XXXXX-XXXX"
                    error={errors.phone?.message}
                  />

                  <Select
                    label="Tipo de contato"
                    options={contactTypeOptions}
                    {...register("type")}
                    error={errors.type?.message}
                    required
                  />

                  <div>
                    <Textarea
                      label="Mensagem"
                      {...register("message")}
                      onChange={(e) => {
                        register("message").onChange(e);
                        setCharCount(e.target.value.length);
                      }}
                      placeholder="Digite sua mensagem aqui..."
                      error={errors.message?.message}
                      maxLength={500}
                      required
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {charCount}/500 caracteres (mínimo 30)
                    </div>
                  </div>

                  <Button type="submit" className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                    Enviar mensagem
                  </Button>
                </form>
              </div>
            </div>
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
