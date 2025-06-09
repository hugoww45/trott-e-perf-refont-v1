"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
  inView: boolean;
}

function FaqItem({ question, answer, isOpen, onClick, index, inView }: FaqItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <button
          onClick={onClick}
          className="flex justify-between items-center w-full text-left p-6 focus:outline-none transition-colors duration-300 hover:bg-white/5"
        >
          <h3 className="text-lg font-medium text-white pr-6">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 w-8 h-8 rounded-full ${isOpen ? 'bg-primary' : 'bg-white/10'} flex items-center justify-center transition-colors duration-300`}
          >
            {isOpen ? (
              <Minus className="w-4 h-4 text-black" />
            ) : (
              <Plus className="w-4 h-4 text-white" />
            )}
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-2 border-t border-white/10 text-gray-400 leading-relaxed">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const faqs = [
    {
      question: "Quelles sont les conditions pour être éligible ?",
      answer: "Pour être éligible à nos solutions de paiement, vous devez être majeur, résider en France, et disposer d'une carte bancaire valide. Pour les offres de crédit, des justificatifs de revenus et d'identité vous seront demandés."
    },
    {
      question: "Puis-je régler avec une carte bancaire prépayée ?",
      answer: "Le paiement en 3 fois n'est généralement pas compatible avec les cartes prépayées. Nous acceptons les cartes Visa, Mastercard et American Express."
    },
    {
      question: "Puis-je solder le crédit à tout moment ?",
      answer: "Oui, vous pouvez solder votre crédit à tout moment. Il vous suffit de contacter notre partenaire financier pour obtenir un décompte à jour."
    },
    {
      question: "Quel est le montant minimum pour financer un achat ?",
      answer: "Le montant minimum sera étudié en fonction de votre situation."
    },
    {
      question: "Comment puis-je suivre mes paiements ?",
      answer: "Vous pouvez suivre vos paiements échelonnés directement sur votre espace client de notre partenaire financier."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 bg-neutral-950 relative">
      {/* Background decorative elements */}
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute -left-64 bottom-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur nos solutions de financement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
            <div className="lg:col-span-2 mb-6">
              {/* Featured Question */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-1"
              >
                <div className="bg-neutral-950/90 backdrop-blur-sm rounded-xl p-6 md:p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Plus className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Comment fonctionne le paiement en 4 fois sans frais ?</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Le paiement en 4 fois sans frais vous permet de répartir le coût de votre achat sur 3 mois.
                        Un premier paiement est effectué le jour de l'achat, puis vous serez débité automatiquement
                        du même montant 30, 60 et 90 jours après l'achat. Aucun frais supplémentaire ni intérêt
                        ne vous sera facturé.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Regular FAQ columns */}
            <div ref={ref} className="space-y-4">
              {faqs.slice(0, 3).map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                  index={index}
                  inView={isInView}
                />
              ))}
            </div>

            <div className="space-y-4">
              {faqs.slice(3, 5).map((faq, index) => (
                <FaqItem
                  key={index + 3}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index + 3}
                  onClick={() => handleToggle(index + 3)}
                  index={index}
                  inView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
