export function MissionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative">
              <img
                src="/img/about.png"
                alt="Nossa Missão - Prato Amigo"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-green-800">
              Nossa Missão
            </h2>
            <p className="text-gray-700">
              De acordo com a ODS 2 da ONU (Objetivo de Desenvolvimento
              Sustentável), a meta global é acabar com a fome, alcançar a
              segurança alimentar, melhorar a nutrição e promover a
              agricultura sustentável até 2030.
            </p>
            <p className="text-gray-700">
              Existe um grande desafio para atingir essa meta, tendo em vista
              que 700 milhões de pessoas passavam fome em 2023, segundo o
              relatório "O Estado da Segurança Alimentar e da Nutrição no
              Mundo". Enquanto isso, um terço de todos os alimentos produzidos
              globalmente é desperdiçado. No Brasil, aproximadamente 27
              milhões de toneladas de alimentos são desperdiçadas anualmente.
            </p>
            <p className="text-gray-700">
              O desperdício pode acontecer por vários fatores: alimentos
              próximos da validade, imperfeições na aparência do alimento ou
              produção acima do necessário. Ao passo em que pessoas em
              vulnerabilidade não têm como garantir sua alimentação diária, um
              dos maiores problemas das ONGs é encontrar um canal que as
              conecte com doadores e facilite o processo logístico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


