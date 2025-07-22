import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Vote, Star } from "lucide-react";
import { motion } from "framer-motion";

export function ElezioniSection() {
  return (
    <section id="elezioni" className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            EleBocconi2025
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-blue-50/50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      14 e 15 Aprile
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Gli studenti di Bocconi avranno l'opportunità di scegliere chi li rappresenterà nei prossimi anni.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-teal-50/50 border-teal-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Star className="h-8 w-8 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      La Visione ASTRA
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>ASTRA</strong> scende in campo con un'idea chiara: trasformare le esigenze degli studenti in azioni concrete.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50/50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Users className="h-8 w-8 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Il Nostro Impegno
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Siamo qui per dare spazio alle tue idee, semplificare la vita universitaria e costruire insieme un'esperienza migliore per tutti.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-lg">
              <p className="text-lg font-medium text-center">
                Segna le date e fai la differenza. Il 14 e 15 aprile, scegli <strong>ASTRA</strong>.
              </p>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl p-8 text-white text-center shadow-2xl">
              <Vote className="h-24 w-24 mx-auto mb-6 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">La Tua Voce Conta</h3>
              <p className="text-lg opacity-90 mb-6">
                Partecipa alle elezioni e aiutaci a costruire il futuro della rappresentanza studentesca
              </p>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-sm font-medium">Date da ricordare:</p>
                <p className="text-2xl font-bold">14-15 APRILE</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}