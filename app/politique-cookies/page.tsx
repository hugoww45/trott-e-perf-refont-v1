"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function PolitiqueCookiesPage() {
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
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Politique de Cookies</h1>

              <div className="prose prose-invert max-w-none">
                <p className="lead text-lg text-gray-300 mb-8">
                  Dernière mise à jour : 15 juin 2023
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
                <p>
                  Un cookie est un petit fichier texte qui peut être stocké sur votre terminal (ordinateur, tablette
                  ou smartphone) lorsque vous visitez notre site web via votre navigateur internet. Le cookie permet
                  au site de "se souvenir" de vos actions et préférences pendant une période déterminée.
                </p>
                <p>
                  Les cookies sont largement utilisés pour permettre aux sites web de fonctionner, ou de fonctionner
                  plus efficacement, ainsi que pour fournir des informations aux propriétaires du site.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">2. Comment nous utilisons les cookies</h2>
                <p>
                  Nous utilisons différents types de cookies sur notre site web :
                </p>

                <h3 className="text-lg font-medium mt-6 mb-3">2.1 Cookies essentiels</h3>
                <p>
                  Ces cookies sont nécessaires au bon fonctionnement de notre site. Ils vous permettent de naviguer sur
                  notre site et d'utiliser ses fonctionnalités, comme l'accès aux zones sécurisées. Sans ces cookies,
                  certains services que vous avez demandés ne peuvent pas être fournis.
                </p>

                <h3 className="text-lg font-medium mt-6 mb-3">2.2 Cookies de performance</h3>
                <p>
                  Ces cookies nous permettent de comprendre comment les visiteurs interagissent avec notre site en recueillant
                  et en analysant des informations de manière anonyme. Cela nous aide à améliorer le fonctionnement de notre
                  site web.
                </p>

                <h3 className="text-lg font-medium mt-6 mb-3">2.3 Cookies de fonctionnalité</h3>
                <p>
                  Ces cookies permettent à notre site de se souvenir des choix que vous avez faits (comme votre nom d'utilisateur,
                  votre langue ou la région dans laquelle vous vous trouvez) et peuvent également être utilisés pour fournir les
                  services que vous avez demandés. Ils peuvent également être utilisés pour se souvenir des modifications que
                  vous avez apportées à la taille du texte, à la police et à d'autres parties de notre site web que vous pouvez
                  personnaliser.
                </p>

                <h3 className="text-lg font-medium mt-6 mb-3">2.4 Cookies de ciblage ou publicitaires</h3>
                <p>
                  Ces cookies sont utilisés pour vous proposer des publicités plus pertinentes pour vous et vos intérêts.
                  Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité ainsi que pour
                  aider à mesurer l'efficacité des campagnes publicitaires. Ils sont généralement placés par des réseaux
                  publicitaires avec notre permission. Ils se souviennent que vous avez visité notre site et cette
                  information est partagée avec d'autres organisations comme les annonceurs.
                </p>

                <h3 className="text-lg font-medium mt-6 mb-3">2.5 Cookies de médias sociaux</h3>
                <p>
                  Ces cookies vous permettent de partager ce que vous faites sur notre site avec vos réseaux sociaux.
                  Ces cookies ne sont pas sous notre contrôle. Veuillez vous référer aux politiques de confidentialité
                  respectives de ces médias sociaux pour savoir comment leurs cookies fonctionnent.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">3. Liste des cookies utilisés</h2>
                <p>
                  Voici la liste des cookies que nous utilisons sur notre site :
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-gray-700 divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Durée</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Finalité</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">sessionid</td>
                        <td className="px-6 py-4 whitespace-nowrap">Essentiel</td>
                        <td className="px-6 py-4 whitespace-nowrap">Session</td>
                        <td className="px-6 py-4">Maintient votre session active pendant votre visite</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">_ga</td>
                        <td className="px-6 py-4 whitespace-nowrap">Performance</td>
                        <td className="px-6 py-4 whitespace-nowrap">2 ans</td>
                        <td className="px-6 py-4">Google Analytics - Distingue les utilisateurs</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">_gid</td>
                        <td className="px-6 py-4 whitespace-nowrap">Performance</td>
                        <td className="px-6 py-4 whitespace-nowrap">24 heures</td>
                        <td className="px-6 py-4">Google Analytics - Distingue les utilisateurs</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">cookie_consent</td>
                        <td className="px-6 py-4 whitespace-nowrap">Fonctionnalité</td>
                        <td className="px-6 py-4 whitespace-nowrap">1 an</td>
                        <td className="px-6 py-4">Enregistre vos préférences de cookies</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">_fbp</td>
                        <td className="px-6 py-4 whitespace-nowrap">Publicitaire</td>
                        <td className="px-6 py-4 whitespace-nowrap">3 mois</td>
                        <td className="px-6 py-4">Utilisé par Facebook pour fournir des services publicitaires</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4">4. Contrôle des cookies</h2>
                <p>
                  Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous
                  les cookies déjà présents sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour
                  les empêcher d'être placés. Mais si vous faites cela, vous devrez peut-être ajuster manuellement certaines
                  préférences chaque fois que vous visiterez un site, et certains services et fonctionnalités pourraient ne
                  pas fonctionner.
                </p>
                <p>
                  Pour plus d'informations sur la gestion des cookies dans votre navigateur, veuillez visiter les liens suivants :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" className="text-primary hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" className="text-primary hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline">Microsoft Edge</a></li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">5. Modification de notre politique de cookies</h2>
                <p>
                  Nous nous réservons le droit de modifier cette politique de cookies à tout moment. Tout changement sera
                  publié sur cette page et entrera en vigueur dès sa publication. Nous vous encourageons à consulter
                  régulièrement cette page pour prendre connaissance des mises à jour.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact</h2>
                <p>
                  Si vous avez des questions concernant notre politique de cookies, veuillez nous contacter à :
                </p>
                <p className="mt-2">
                  Email : contact@trott-e-perf.fr<br />
                  Adresse postale : 2 All. des Roseraies, 45100 Orléans<br />
                  Téléphone : 09 87 28 52 44
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
