"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calculator,
  PiggyBank,
  Calendar,
  CreditCard,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  interestRate: number;
  minMonths: number;
  maxMonths: number;
  minAmount: number;
  maxAmount: number;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "multiple",
    name: "Paiement en plusieurs fois",
    description: "Divisez votre achat en 2, 3 ou 4 paiements sans frais",
    icon: <CreditCard className="h-5 w-5" />,
    interestRate: 0,
    minMonths: 2,
    maxMonths: 4,
    minAmount: 100,
    maxAmount: 3000
  },
  {
    id: "credit",
    name: "Crédit classique",
    description: "Financez votre achat sur une plus longue durée",
    icon: <Calendar className="h-5 w-5" />,
    interestRate: 4.9,
    minMonths: 6,
    maxMonths: 36,
    minAmount: 500,
    maxAmount: 10000
  },
  {
    id: "leasing",
    name: "Location avec option d'achat",
    description: "Profitez maintenant, décidez plus tard",
    icon: <PiggyBank className="h-5 w-5" />,
    interestRate: 3.9,
    minMonths: 12,
    maxMonths: 48,
    minAmount: 1000,
    maxAmount: 15000
  }
];

export default function SimulatorSection() {
  const [amount, setAmount] = useState(1500);
  const [duration, setDuration] = useState(12);
  const [selectedOption, setSelectedOption] = useState<PaymentOption>(paymentOptions[0]);
  const [showDetails, setShowDetails] = useState(false);
  const [animateValue, setAnimateValue] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Calculer le montant mensuel
  const calculateMonthlyPayment = () => {
    if (selectedOption.id === "multiple") {
      // Paiement en plusieurs fois
      return amount / duration;
    } else {
      // Crédit avec intérêt
      const monthlyRate = selectedOption.interestRate / 100 / 12;
      const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, duration);
      const denominator = Math.pow(1 + monthlyRate, duration) - 1;
      return numerator / denominator;
    }
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalCost = monthlyPayment * duration;
  const totalInterest = totalCost - amount;

  useEffect(() => {
    setAnimateValue(true);
    const timer = setTimeout(() => setAnimateValue(false), 700);
    return () => clearTimeout(timer);
  }, [amount, duration, selectedOption]);

  // Ajuster la durée lorsqu'on change d'option
  useEffect(() => {
    setDuration(Math.max(
      selectedOption.minMonths,
      Math.min(duration, selectedOption.maxMonths)
    ));
  }, [selectedOption]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };

  return (
    <section className="relative py-28 bg-gradient-to-b from-black/90 to-black overflow-hidden">
      {/* Effet de grille en arrière-plan */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-25"></div>

      {/* Orbe lumineuse */}
      <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] opacity-15"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simulateur</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-white">Simulez votre </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              financement
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Calculez vos mensualités en fonction de vos besoins et de votre budget
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          {/* Colonne du simulateur */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-sm p-8"
          >
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-6">Options de financement</h3>

              <Tabs defaultValue="multiple" className="w-full" onValueChange={(value) => {
                const option = paymentOptions.find(opt => opt.id === value);
                if (option) setSelectedOption(option);
              }}>
                <TabsList className="grid grid-cols-3 mb-8">
                  {paymentOptions.map((option) => (
                    <TabsTrigger
                      key={option.id}
                      value={option.id}
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                    >
                      {option.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {paymentOptions.map((option) => (
                  <TabsContent key={option.id} value={option.id} className="mt-0">
                    <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-white/5">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/20 text-primary">
                        {option.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{option.name}</h4>
                        <p className="text-gray-400 text-sm">{option.description}</p>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Sliders de montant et durée */}
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-300 font-medium">Montant</label>
                  <div className="text-white font-semibold">
                    {formatCurrency(amount)}
                  </div>
                </div>
                <Slider
                  value={[amount]}
                  min={selectedOption.minAmount}
                  max={selectedOption.maxAmount}
                  step={100}
                  onValueChange={(value) => setAmount(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatCurrency(selectedOption.minAmount)}</span>
                  <span>{formatCurrency(selectedOption.maxAmount)}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-300 font-medium">Durée</label>
                  <div className="text-white font-semibold">
                    {duration} {duration > 1 ? 'mois' : 'mois'}
                  </div>
                </div>
                <Slider
                  value={[duration]}
                  min={selectedOption.minMonths}
                  max={selectedOption.maxMonths}
                  step={selectedOption.id === "multiple" ? 1 : 3}
                  onValueChange={(value) => setDuration(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{selectedOption.minMonths} mois</span>
                  <span>{selectedOption.maxMonths} mois</span>
                </div>
              </div>
            </div>

            <button
              className="w-full mt-8 py-3 text-gray-300 text-sm font-medium flex items-center justify-center hover:text-white transition-colors"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <>Masquer les détails <ChevronUp className="ml-2 h-4 w-4" /></>
              ) : (
                <>Afficher les détails <ChevronDown className="ml-2 h-4 w-4" /></>
              )}
            </button>

            {/* Détails supplémentaires */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showDetails ? 'auto' : 0,
                opacity: showDetails ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Taux d'intérêt annuel</span>
                  <span className="text-white">{selectedOption.interestRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Coût total du crédit</span>
                  <span className="text-white">{formatCurrency(totalCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total des intérêts</span>
                  <span className="text-white">{formatCurrency(totalInterest)}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne des résultats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-primary/20 to-blue-600/20 backdrop-blur-lg border border-white/10 p-8 rounded-2xl h-full relative overflow-hidden">
              {/* Effet de points */}
              <div className="absolute inset-0 grid grid-cols-8 gap-4 opacity-20">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white" />
                ))}
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-8">Votre simulation</h3>

                <div className="space-y-8 flex-grow">
                  <div>
                    <div className="text-gray-300 mb-2 text-sm">Mensualité estimée</div>
                    <motion.div
                      className="text-4xl font-bold text-white"
                      animate={animateValue ? {
                        scale: [1, 1.05, 1],
                        color: ["#ffffff", "#38bdf8", "#ffffff"]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {formatCurrency(monthlyPayment)}
                    </motion.div>
                  </div>

                  <div>
                    <div className="text-gray-300 mb-3 text-sm">Ce que vous obtenez</div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="mt-0.5 mr-3 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-gray-300 text-sm">Réponse immédiate</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-0.5 mr-3 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-gray-300 text-sm">Démarches 100% en ligne</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-0.5 mr-3 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-gray-300 text-sm">Aucuns frais de dossier</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8"
                >
                  <Button className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 py-6 rounded-xl group">
                    <span className="text-base">Faire une demande</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>

                {/* Indicateur de sécurité */}
                <div className="mt-4 px-3 py-2 bg-white/5 rounded-lg flex items-center text-xs text-gray-300">
                  <Sparkles className="h-3 w-3 text-primary mr-2" />
                  <span>Calcul indicatif sans engagement</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
