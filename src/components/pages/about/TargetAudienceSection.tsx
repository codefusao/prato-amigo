import { Utensils, Users as UsersIcon, Truck } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../ui/Card";

export function TargetAudienceSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">Público-Alvo</h2>
          <p className="text-gray-700 mt-2">
            Conheça quem faz parte da nossa rede de conexões
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Doadores</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Quem são?</p>
                  <p className="text-gray-700">
                    Restaurantes, padarias, supermercados, hortifrutis e
                    feiras livres que possuem alimentos em perfeitas
                    condições, mas que não serão comercializados.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Necessidade:</p>
                  <p className="text-gray-700">
                    Ter um canal prático, rápido e sem burocracia para doar
                    alimentos.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Dificuldades:</p>
                  <p className="text-gray-700">
                    Falta de organização para doações, incerteza sobre quem
                    receberá e questões logísticas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <UsersIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Receptores</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Quem são?</p>
                  <p className="text-gray-700">
                    ONGs, projetos sociais, abrigos e comunidades carentes.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Necessidade:</p>
                  <p className="text-gray-700">
                    Receber alimentos de forma constante, segura e organizada.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Dificuldades:</p>
                  <p className="text-gray-700">
                    Escassez de doações regulares, imprevisibilidade no
                    recebimento, falhas na logística de distribuição.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">
                Voluntários de Logística
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Quem são?</p>
                  <p className="text-gray-700">
                    Motoristas, entregadores voluntários ou empresas parceiras
                    que possam ajudar no transporte das doações.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Necessidade:</p>
                  <p className="text-gray-700">
                    Ter uma plataforma onde possam se cadastrar e participar
                    das entregas.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Dificuldades:</p>
                  <p className="text-gray-700">
                    Falta de organização e informação sobre onde e quando
                    ajudar.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

