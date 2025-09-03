import { Logo } from "../components/Logo";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function PrivacyPolicy() {
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
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introdução
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Esta Política de Privacidade descreve como o Prato Amigo coleta, usa, armazena e protege suas informações pessoais quando você utiliza nossa plataforma. Respeitamos sua privacidade e estamos comprometidos em proteger seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD) e outras legislações aplicáveis.
            </p>
          </section>

                     <section>
             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
               2. Informações que Coletamos
             </h2>
             <div className="space-y-4">
               <div>
                 <h3 className="text-lg font-medium text-gray-900 mb-2">2.1 Informações Fornecidas por Você</h3>
                 <ul className="list-disc list-inside text-gray-700 space-y-1">
                   <li>Nome completo ou razão social</li>
                   <li>Endereço de email</li>
                   <li>Número de telefone</li>
                   <li>Endereço residencial ou comercial</li>
                   <li>Cidade e estado</li>
                   <li>Tipo de usuário (doador, receptor, voluntário)</li>
                   <li>Senha (armazenada localmente no navegador)</li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-lg font-medium text-gray-900 mb-2">2.2 Informações Coletadas Automaticamente</h3>
                 <ul className="list-disc list-inside text-gray-700 space-y-1">
                   <li>Dados básicos de navegação (páginas visitadas)</li>
                   <li>Informações de sessão (para manter login)</li>
                 </ul>
                 <p className="text-gray-600 text-sm mt-2">
                   <strong>Importante:</strong> Atualmente não coletamos dados analíticos detalhados, cookies de rastreamento ou informações de terceiros.
                 </p>
               </div>
             </div>
           </section>

                     <section>
             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
               3. Como Utilizamos suas Informações
             </h2>
             <p className="text-gray-700 leading-relaxed mb-4">
               Atualmente utilizamos suas informações pessoais apenas para:
             </p>
             <ul className="list-disc list-inside text-gray-700 space-y-2">
               <li>Fornecer acesso à plataforma</li>
               <li>Manter sua sessão de login</li>
               <li>Exibir suas informações no perfil</li>
               <li>Identificar seu tipo de usuário (doador, receptor, voluntário)</li>
             </ul>
             <p className="text-gray-600 text-sm mt-4">
               <strong>Nota:</strong> Funcionalidades como notificações, análises de uso e comunicações automáticas ainda não estão implementadas.
             </p>
           </section>

                     <section>
             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
               4. Base Legal para o Tratamento
             </h2>
             <div className="space-y-4">
               <div>
                 <h3 className="text-lg font-medium text-gray-900 mb-2">4.1 Execução de Contrato</h3>
                 <p className="text-gray-700">
                   Para fornecer acesso à plataforma e cumprir os Termos de Uso.
                 </p>
               </div>
               <div>
                 <h3 className="text-lg font-medium text-gray-900 mb-2">4.2 Consentimento</h3>
                 <p className="text-gray-700">
                   Para armazenar seus dados de cadastro e manter sua conta ativa.
                 </p>
               </div>
             </div>
             <p className="text-gray-600 text-sm mt-4">
               <strong>Observação:</strong> Como ainda não temos funcionalidades avançadas, nossa base legal é limitada ao essencial para o funcionamento básico da plataforma.
             </p>
           </section>

                     <section>
             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
               5. Compartilhamento de Informações
             </h2>
             <p className="text-gray-700 leading-relaxed mb-4">
               Atualmente, suas informações pessoais são armazenadas apenas localmente no seu navegador e não são compartilhadas com:
             </p>
             <ul className="list-disc list-inside text-gray-700 space-y-2">
               <li>Outros usuários da plataforma</li>
               <li>Serviços de terceiros</li>
               <li>Redes sociais ou plataformas externas</li>
               <li>Serviços de análise ou publicidade</li>
             </ul>
             <p className="text-gray-600 text-sm mt-4">
               <strong>Importante:</strong> Como o sistema ainda não possui backend, todos os dados ficam armazenados apenas no seu navegador local.
             </p>
           </section>

                     <section>
             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
               6. Segurança dos Dados
             </h2>
             <p className="text-gray-700 leading-relaxed mb-4">
               Atualmente, implementamos as seguintes medidas de segurança:
             </p>
             <ul className="list-disc list-inside text-gray-700 space-y-2">
               <li>Armazenamento local seguro no navegador</li>
               <li>Validação de dados no frontend</li>
               <li>Proteção contra ataques XSS básicos</li>
             </ul>
             <p className="text-gray-600 text-sm mt-4">
               <strong>Limitações atuais:</strong> Como ainda não temos backend, não implementamos criptografia avançada, backup de dados ou monitoramento de segurança. Essas funcionalidades serão adicionadas quando o sistema evoluir.
             </p>
           </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Seus Direitos
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              De acordo com a LGPD, você possui os seguintes direitos:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Acesso</h3>
                <p className="text-green-800 text-sm">Solicitar informações sobre seus dados</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Correção</h3>
                <p className="text-green-800 text-sm">Corrigir dados incorretos ou incompletos</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Exclusão</h3>
                <p className="text-green-800 text-sm">Solicitar a exclusão de seus dados</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Portabilidade</h3>
                <p className="text-green-800 text-sm">Receber seus dados em formato legível</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Oposição</h3>
                <p className="text-green-800 text-sm">Opor-se ao tratamento de seus dados</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Revogação</h3>
                <p className="text-green-800 text-sm">Revogar consentimento a qualquer momento</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Retenção de Dados
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, ou conforme exigido por lei. Quando não precisarmos mais de suas informações, as excluiremos de forma segura ou as anonimizaremos.
            </p>
          </section>

                     <section>
             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
               9. Cookies e Tecnologias Similares
             </h2>
             <p className="text-gray-700 leading-relaxed mb-4">
               Atualmente utilizamos apenas:
             </p>
             <ul className="list-disc list-inside text-gray-700 space-y-2">
               <li>LocalStorage para manter sua sessão de login</li>
               <li>Dados básicos de navegação</li>
             </ul>
             <p className="text-gray-600 text-sm mt-4">
               <strong>Importante:</strong> Não utilizamos cookies de rastreamento, analytics ou publicidade. Apenas armazenamento local essencial para o funcionamento da plataforma.
             </p>
           </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Alterações nesta Política
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através da plataforma ou por email. Recomendamos que você revise esta política regularmente.
            </p>
          </section>

                     <section>
             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
               11. Contato
             </h2>
             <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
               <h3 className="text-lg font-medium text-blue-900 mb-3">Informações de Contato</h3>
               <p className="text-blue-800 mb-2">
                 <strong>Email:</strong> contato@pratoamigo.com.br
               </p>
               <p className="text-blue-800">
                 <strong>Plataforma:</strong> Use a página de contato da aplicação
               </p>
             </div>
             <p className="text-gray-600 text-sm mt-4">
               <strong>Nota:</strong> Como ainda não temos uma estrutura completa, não temos DPO (Encarregado de Proteção de Dados) designado. Isso será implementado quando o sistema evoluir e tiver backend.
             </p>
           </section>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <p className="text-green-800 text-center">
              <strong>Seus dados estão seguros conosco!</strong><br />
              Estamos comprometidos em proteger sua privacidade e garantir o uso responsável de suas informações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
