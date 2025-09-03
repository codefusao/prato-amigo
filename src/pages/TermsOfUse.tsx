import { Logo } from "../components/Logo";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
          
          <div className="text-center">
            <Logo size="lg" className="justify-center mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Termos de Uso
            </h1>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Aceitação dos Termos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ao acessar e utilizar a plataforma Prato Amigo, você concorda em cumprir e estar vinculado aos termos e condições de uso estabelecidos neste documento. Se você não concordar com qualquer parte destes termos, não deve utilizar nossa plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Descrição do Serviço
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O Prato Amigo é uma plataforma digital que conecta pessoas e organizações interessadas em reduzir o desperdício de alimentos através de doações e recebimento de alimentos. Nossa missão é promover a solidariedade e sustentabilidade alimentar.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Facilitar conexões entre doadores e receptores de alimentos</li>
              <li>Promover práticas sustentáveis de consumo</li>
              <li>Reduzir o desperdício alimentar na comunidade</li>
              <li>Fortalecer redes de solidariedade local</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Tipos de Usuários
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Doadores</h3>
                <p className="text-gray-700">
                  Pessoas físicas ou jurídicas que desejam doar alimentos em bom estado para consumo.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Receptores</h3>
                <p className="text-gray-700">
                  Pessoas físicas ou jurídicas que necessitam receber doações de alimentos.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Voluntários</h3>
                <p className="text-gray-700">
                  Pessoas que desejam ajudar na logística e distribuição de alimentos.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Responsabilidades dos Usuários
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">4.1 Informações Verídicas</h3>
                <p className="text-gray-700">
                  Os usuários devem fornecer informações verdadeiras, precisas e atualizadas durante o cadastro e uso da plataforma.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">4.2 Qualidade dos Alimentos</h3>
                <p className="text-gray-700">
                  Os doadores são responsáveis por garantir que os alimentos doados estejam em condições adequadas para consumo, respeitando prazos de validade e condições de armazenamento.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">4.3 Uso Adequado</h3>
                <p className="text-gray-700">
                  Os usuários devem utilizar a plataforma de forma ética e responsável, respeitando outros usuários e as regras estabelecidas.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Limitações de Responsabilidade
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O Prato Amigo atua como intermediário entre doadores e receptores. Não nos responsabilizamos por:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Qualidade, segurança ou adequação dos alimentos doados</li>
              <li>Danos decorrentes do consumo de alimentos recebidos</li>
              <li>Problemas logísticos entre usuários</li>
              <li>Disputas entre doadores e receptores</li>
              <li>Interrupções temporárias do serviço</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Privacidade e Proteção de Dados
            </h2>
            <p className="text-gray-700 leading-relaxed">
              O tratamento de dados pessoais dos usuários é regido por nossa Política de Privacidade, que faz parte integrante destes Termos de Uso. Ao utilizar nossa plataforma, você concorda com o tratamento de seus dados conforme descrito na Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Modificações dos Termos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação na plataforma. O uso continuado da plataforma após as modificações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Contato
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Para dúvidas, sugestões ou reclamações relacionadas a estes Termos de Uso, entre em contato conosco através dos canais disponíveis na plataforma ou pelo email: contato@pratoamigo.com.br
            </p>
          </section>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <p className="text-green-800 text-center">
              <strong>Obrigado por fazer parte da nossa rede de solidariedade!</strong><br />
              Juntos, podemos reduzir o desperdício de alimentos e construir uma comunidade mais sustentável.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
