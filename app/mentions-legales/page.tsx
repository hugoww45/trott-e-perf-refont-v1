"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function MentionsLegalesPage() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md">
        <Navigation />
      </div>

      <main className="min-h-screen bg-background text-foreground pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Mentions Légales</h1>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-xl font-semibold mt-8 mb-4">1. Informations légales</h2>
                <p>
                  Le site Trott-E-Perf est édité par la société Trott-E-Perf, SARL au capital de 10 000 euros,
                  immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789,
                  dont le siège social est situé au 123 Avenue des Trottinettes, 75001 Paris, France.
                </p>
                <p>
                  N° de TVA intracommunautaire : FR 12 345 678 901<br />
                  Directeur de la publication : Jean Dupont
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">2. Hébergement</h2>
                <p>
                  Le site est hébergé par la société Hébergement Pro, SAS au capital de 50 000 euros,
                  immatriculée au RCS de Lyon sous le numéro 987 654 321, dont le siège social est
                  situé au 456 Rue des Serveurs, 69000 Lyon, France.
                </p>
                <p>
                  Téléphone : 04 56 78 90 12<br />
                  Email : contact@hebergementpro.fr
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">3. Propriété intellectuelle</h2>
                <p>
                  L'ensemble des éléments constituant le site Trott-E-Perf (textes, graphismes, logiciels,
                  photographies, images, vidéos, sons, plans, logos, marques, etc.) ainsi que la structure
                  générale du site sont la propriété exclusive de Trott-E-Perf ou de ses partenaires.
                </p>
                <p>
                  Toute représentation, reproduction, modification, utilisation commerciale, ainsi que tout
                  transfert vers un autre site sont interdits, sauf autorisation expresse et préalable de
                  Trott-E-Perf.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">4. Liens hypertextes</h2>
                <p>
                  Le site Trott-E-Perf peut contenir des liens hypertextes vers d'autres sites internet.
                  Trott-E-Perf n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant
                  à leur contenu et leur utilisation.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">5. Données personnelles</h2>
                <p>
                  Les informations recueillies sur ce site font l'objet d'un traitement informatique destiné
                  à Trott-E-Perf pour la gestion de sa clientèle et sa prospection commerciale.
                </p>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique
                  et Libertés modifiée, vous disposez d'un droit d'accès, de rectification, d'effacement, de
                  limitation, de portabilité et d'opposition aux données vous concernant. Vous pouvez exercer
                  ces droits en nous contactant à l'adresse : dpo@trott-e-perf.com
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">6. Loi applicable et juridiction</h2>
                <p>
                  Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux
                  français seront seuls compétents.
                </p>
              </div>

              <div className="mt-12 text-sm text-gray-400">
                <p>Dernière mise à jour : 15 juin 2023</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
