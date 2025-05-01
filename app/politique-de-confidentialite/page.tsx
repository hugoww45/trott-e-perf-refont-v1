"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function PolitiqueConfidentialitePage() {
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
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Politique de Confidentialité</h1>

              <div className="prose prose-invert max-w-none">
                <p className="lead text-lg text-gray-300 mb-8">
                  Dernière mise à jour : 15 juin 2023
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
                <p>
                  Chez Trott-E-Perf, nous accordons une grande importance à la protection de vos données personnelles.
                  Cette politique de confidentialité a pour but de vous informer de la façon dont nous collectons,
                  utilisons, partageons et protégeons vos informations personnelles lorsque vous utilisez notre site web,
                  nos produits et nos services.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">2. Données collectées</h2>
                <p>Nous pouvons collecter les types d'informations suivants :</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>
                    <span className="font-medium">Données d'identification :</span> nom, prénom, adresse email, numéro de téléphone, adresse postale.
                  </li>
                  <li>
                    <span className="font-medium">Données de transaction :</span> informations relatives à vos achats, historique des commandes, détails de paiement.
                  </li>
                  <li>
                    <span className="font-medium">Données techniques :</span> adresse IP, type et version du navigateur, paramètres de fuseau horaire, types et versions de plug-in, système d'exploitation.
                  </li>
                  <li>
                    <span className="font-medium">Données d'utilisation :</span> informations sur la façon dont vous utilisez notre site, nos produits et services.
                  </li>
                  <li>
                    <span className="font-medium">Données de communication :</span> vos préférences en matière de réception de nos communications marketing.
                  </li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">3. Finalités du traitement</h2>
                <p>Nous utilisons vos données personnelles pour les finalités suivantes :</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Gérer votre compte et vous fournir nos produits et services</li>
                  <li>Traiter et livrer vos commandes</li>
                  <li>Vous envoyer des informations techniques, commerciales ou promotionnelles</li>
                  <li>Améliorer notre site web, nos produits et services</li>
                  <li>Assurer la sécurité de notre site et prévenir la fraude</li>
                  <li>Répondre à vos demandes de renseignements ou réclamations</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">4. Base légale du traitement</h2>
                <p>
                  Nous traitons vos données personnelles sur les bases légales suivantes :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>L'exécution d'un contrat lorsque nous vous fournissons des produits ou services</li>
                  <li>Notre intérêt légitime à développer et améliorer nos services</li>
                  <li>Votre consentement, notamment pour l'envoi de communications marketing</li>
                  <li>Le respect de nos obligations légales</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">5. Partage des données</h2>
                <p>
                  Nous pouvons partager vos données personnelles avec :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Nos prestataires de services (hébergement, logistique, paiement, etc.)</li>
                  <li>Nos partenaires commerciaux, avec votre consentement</li>
                  <li>Les autorités compétentes, lorsque nous y sommes légalement tenus</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">6. Conservation des données</h2>
                <p>
                  Nous conservons vos données personnelles aussi longtemps que nécessaire pour les finalités
                  pour lesquelles nous les avons collectées, y compris pour satisfaire à toute exigence légale,
                  comptable ou de reporting.
                </p>
                <p>
                  Pour déterminer la période de conservation appropriée, nous prenons en compte la quantité,
                  la nature et la sensibilité des données personnelles, le risque potentiel de préjudice en
                  cas d'utilisation ou de divulgation non autorisée, les finalités pour lesquelles nous traitons
                  vos données personnelles et si nous pouvons atteindre ces finalités par d'autres moyens.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">7. Vos droits</h2>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique
                  et Libertés modifiée, vous disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Droit d'accès</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement (droit à l'oubli)</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d'opposition</li>
                  <li>Droit de retirer votre consentement</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits ou pour toute question concernant le traitement de vos données personnelles,
                  vous pouvez nous contacter à l'adresse : dpo@trott-e-perf.com
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">8. Sécurité des données</h2>
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
                  vos données personnelles contre tout traitement non autorisé ou illégal et contre toute perte,
                  destruction ou dommage accidentels.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">9. Cookies et technologies similaires</h2>
                <p>
                  Notre site utilise des cookies et des technologies similaires pour améliorer votre expérience
                  de navigation, analyser l'utilisation du site et vous proposer des contenus personnalisés.
                  Pour plus d'informations sur notre utilisation des cookies, veuillez consulter notre
                  Politique relative aux cookies.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">10. Modifications de la politique de confidentialité</h2>
                <p>
                  Nous pouvons mettre à jour cette politique de confidentialité de temps à autre en publiant
                  une nouvelle version sur notre site. Nous vous invitons à consulter régulièrement cette page
                  pour prendre connaissance de tout changement.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact</h2>
                <p>
                  Pour toute question concernant cette politique de confidentialité ou nos pratiques en matière
                  de protection des données, veuillez nous contacter à :
                </p>
                <p className="mt-2">
                  Email : dpo@trott-e-perf.com<br />
                  Adresse postale : 123 Avenue des Trottinettes, 75001 Paris, France<br />
                  Téléphone : 01 23 45 67 89
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
