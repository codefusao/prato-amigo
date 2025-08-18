import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Link } from "react-router";

export function ContactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">
              Fale Conosco
            </h2>
            <p className="text-gray-700 mt-2">
              Queremos ouvir você! Estamos à disposição para ajudar.
            </p>
          </div>

          <Card className="border-green-100 shadow-lg">
            <CardContent className="py-8">
              <div className="text-center mb-6">
                <p className="text-gray-700">
                  Entre em contato através de qualquer um dos nossos canais de
                  atendimento:
                </p>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    info: "contato@pratoamigo.com.br",
                  },
                  { icon: Phone, title: "Telefone", info: "(11) 99999-9999" },
                  {
                    icon: MapPin,
                    title: "Endereço",
                    info: "Av. Paulista, 1000 - São Paulo, SP",
                  },
                ].map((contact, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <contact.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-green-800 text-lg">
                      {contact.title}
                    </h3>
                    <p className="text-gray-700">{contact.info}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link to="/contato">
                  <Button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                    Enviar mensagem
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}


