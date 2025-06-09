"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: JSX.Element;
  delay: number;
}

function Step({ number, title, description, icon, delay }: StepProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, delay }}
      className="flex items-start"
    >
      <div className="flex-shrink-0 w-16 h-16 bg-primary text-black rounded-full flex items-center justify-center text-xl font-medium mr-6">
        {number}
      </div>
      <div>
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-3 text-primary">{icon}</span>
          <h3 className="text-xl font-medium text-white">{title}</h3>
        </div>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}

export default function StepsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const steps = [
    {
      number: 1,
      title: "Choisissez votre trottinette",
      description: "Parcourez notre catalogue et sélectionnez le modèle qui correspond à vos besoins.",
      icon: <span>🛴</span>,
    },
    {
      number: 2,
      title: "Sélectionnez votre financement",
      description: "Choisissez l'option de paiement qui vous convient le mieux.",
      icon: <span>💰</span>,
    },
    {
      number: 3,
      title: "Rider tranquille",
      description: "Profitez de votre nouvelle trottinette et de votre liberté de mouvement.",
      icon: <span>🚀</span>,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-neutral-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
            Un processus simple et rapide
          </h2>
          <p className="text-gray-400 text-lg">
            De la sélection à l'acquisition, nous avons simplifié chaque étape du processus
          </p>
        </motion.div>

        <div
          ref={ref}
          className="relative max-w-3xl mx-auto"
        >
          {/* Ligne verticale animée */}
          <motion.div
            className="absolute left-8 top-0 w-[2px] h-full bg-border/40 origin-top"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={lineVariants}
          />

          {/* Étapes */}
          <motion.div
            className="space-y-16 relative"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <Step
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                delay={index * 0.2}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
