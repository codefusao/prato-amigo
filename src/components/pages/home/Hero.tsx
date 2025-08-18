import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/Button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-green-100/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-green-800">
              Conectando quem tem com quem precisa
            </h1>
            <p className="text-lg text-gray-700">
              Ajudamos a reduzir o desperdício de alimentos conectando
              doadores a receptores, contribuindo para um mundo mais
              sustentável e solidário.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/cadastro">
                <Button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-lg transition-all flex items-center gap-2">
                  Quero doar
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="outline" className="px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-all">
                  Preciso de doações
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <img
                src="/img/hero.jpg"
                alt="Prato Amigo - Conectando quem tem com quem precisa"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-lg"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


