"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CreditCard, CalendarRange, Search, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

interface SolutionCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  color: string;
  benefits?: string[];
  highlight?: boolean;
}

function SolutionCard({ title, subtitle, description, icon, index, color, benefits = [], highlight = false }: SolutionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Gradient animation effect
  const gradientControls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      gradientControls.start({
        background: [
          `linear-gradient(45deg, ${color}22, transparent 70%)`,
          `linear-gradient(135deg, ${color}22, transparent 70%)`,
          `linear-gradient(225deg, ${color}22, transparent 70%)`,
          `linear-gradient(315deg, ${color}22, transparent 70%)`,
          `linear-gradient(45deg, ${color}22, transparent 70%)`,
        ],
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }
      });
    } else {
      gradientControls.stop();
      gradientControls.set({
        background: `linear-gradient(45deg, ${color}11, transparent 70%)`
      });
    }
  }, [isHovered, color, gradientControls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`${highlight ? 'col-span-full' : 'col-span-1'}`}
    >
      <div
        ref={cardRef}
        className={`group relative h-full rounded-2xl overflow-hidden ${highlight ? 'p-0' : 'p-0'} border border-white/5 backdrop-blur-sm`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient background */}
        <motion.div
          animate={gradientControls}
          className="absolute inset-0"
        />

        {/* Particle effects */}
        <AnimatePresence>
          {isHovered && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  initial={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    x: [null, Math.random() * 200 - 100],
                    y: [null, Math.random() * 200 - 100],
                    opacity: [0, 0.7, 0],
                    scale: [0, Math.random() * 0.5 + 0.5, 0]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1.5 + Math.random() }}
                  className={`absolute rounded-full ${color} bg-opacity-20 w-4 h-4`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Gradient border effect - more pronounced on hover */}
        <div className="absolute inset-0 p-[1px] rounded-2xl overflow-hidden">
          <div className={`absolute inset-0 ${color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
        </div>

        {/* Card content */}
        <div className="relative p-8 h-full z-10 flex flex-col">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.5 }}
            className={`w-12 h-12 rounded-xl ${color} bg-opacity-20 flex items-center justify-center mb-6`}
          >
            {icon}
          </motion.div>

          <div className="space-y-3">
            <motion.h3
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white"
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-xl font-medium text-primary"
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -3 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {subtitle}
            </motion.p>
            <motion.p
              className="text-gray-400 leading-relaxed"
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {description}
            </motion.p>
          </div>

          {/* Benefits */}
          {benefits.length > 0 && (
            <motion.div
              className="mt-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{benefit}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SolutionsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const solutions = [
    {
      title: "Paiement en plusieurs fois",
      subtitle: "Jusqu'à 3 à 60x",
      description: "Réglez votre achat en 3 à 60 paiements échelonnés.",
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      color: "bg-gray-500",
      benefits: [
        "Paiements automatiques",
        "Aucun coût supplémentaire",
        "Validation immédiate"
      ]
    },
    {
      title: "Crédit partenaire",
      subtitle: "LOA et LLD disponibles",
      description: "Possibilité de souscrire à un crédit LOA ou LLD pour financer votre trottinette.",
      icon: <CalendarRange className="h-6 w-6 text-primary" />,
      color: "bg-gray-500",
      benefits: [
        "Flexible et personnalisable",
        "S'adapte à votre besoins",
        "Support dédié"
      ]
    },
    {
      title: "Offres personnalisées",
      subtitle: "Sur mesure",
      description: "Des solutions adaptées à votre profil et vos besoins spécifiques pour un financement optimal.",
      icon: <Search className="h-6 w-6 text-primary" />,
      color: "bg-gray-500",
      benefits: [
        "Conseil personnalisé",
        "Étude gratuite",
        "Propositions multiples"
      ]
    }
  ];

  const featuredSolution = {
    title: "Libérez votre mobilité sans contrainte budgétaire",
    subtitle: "Solutions flexibles pour tous",
    description: "Nos conseillers vous accompagnent pour trouver la solution de financement idéale qui s'adapte parfaitement à votre budget et à vos besoins de mobilité urbaine.",
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    color: "bg-gray-500",
    highlight: true,
    benefits: [
      "Réponse en rapide",
      "Documents dématérialisés",
      "+90% de clients satisfaits"
    ]
  };

  // Cards staggered animation
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <section className="relative py-28 overflow-hidden" id="solutions-section">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10"></div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute -left-64 top-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-20"
        animate={{
          x: [0, 30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -right-64 bottom-1/3 w-96 h-96 bg-blue-500/30 rounded-full blur-[128px] opacity-20"
        animate={{
          x: [0, -30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6 bg-primary/10 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Solutions Adaptées</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-white">Nos Solutions de</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Financement</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Des options flexibles pour acquérir votre trottinette en toute sérénité
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              title={solution.title}
              subtitle={solution.subtitle}
              description={solution.description}
              icon={solution.icon}
              index={index}
              color={solution.color}
              benefits={solution.benefits}
            />
          ))}
        </div>

        <div className="mt-12">
          <SolutionCard
            title={featuredSolution.title}
            subtitle={featuredSolution.subtitle}
            description={featuredSolution.description}
            icon={featuredSolution.icon}
            index={3}
            color={featuredSolution.color}
            highlight={featuredSolution.highlight}
            benefits={featuredSolution.benefits}
          />
        </div>
      </div>
    </section>
  );
}
