import { Link } from "react-router";
import { BarChart3, Users, Truck } from "lucide-react";
import { Button } from "../../ui/Button";

export function ImpactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative">
              <img
                src="/img/impacto-social.png"
                alt="Impacto Social - Reduzindo desperdício e combatendo a fome"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-green-800">
              Impacto Esperado
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Redução do desperdício
                  </h3>
                  <p className="text-gray-700">
                    Diminuição significativa do desperdício de alimentos em
                    boas condições.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Combate à fome
                  </h3>
                  <p className="text-gray-700">
                    Diminuição da insegurança alimentar em comunidades
                    vulneráveis.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Organização logística
                  </h3>
                  <p className="text-gray-700">
                    Maior organização e previsibilidade nas doações e
                    entregas.
                  </p>
                </div>
              </li>
            </ul>
            <Link to="/sobre">
              <Button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                Conheça nosso impacto
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


