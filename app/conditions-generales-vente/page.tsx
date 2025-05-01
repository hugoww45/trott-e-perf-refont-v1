"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function CGVPage() {
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
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Conditions Générales de Vente</h1>

              <div className="prose prose-invert max-w-none">
                <p className="lead text-lg text-gray-300 mb-8">
                  Dernière mise à jour : 15 juin 2023
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 1 - Objet et champ d'application</h2>
                <p>
                  Les présentes Conditions Générales de Vente (ci-après "CGV") déterminent les droits et obligations
                  des parties dans le cadre de la vente de produits et services proposés par Trott-E-Perf.
                </p>
                <p>
                  Les présentes CGV s'appliquent, sans restriction ni réserve, à l'ensemble des ventes de produits
                  et services proposés par Trott-E-Perf sur son site internet www.trott-e-perf.com.
                </p>
                <p>
                  Le Client déclare avoir pris connaissance des présentes CGV et les avoir acceptées avant de passer
                  commande. La validation de la commande vaut donc acceptation sans restriction ni réserve des présentes CGV.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 2 - Prix</h2>
                <p>
                  Les prix des produits et services sont indiqués en euros toutes taxes comprises (TTC), hors frais de livraison.
                </p>
                <p>
                  Trott-E-Perf se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés
                  sur la base des tarifs en vigueur au moment de la validation de la commande.
                </p>
                <p>
                  Les frais de livraison sont indiqués avant la validation finale de la commande et sont facturés en
                  supplément du prix des produits.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 3 - Commandes</h2>
                <p>
                  Le Client peut passer commande sur le site internet www.trott-e-perf.com.
                </p>
                <p>
                  Pour que la commande soit validée, le Client devra :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Sélectionner les produits et les ajouter au panier</li>
                  <li>Remplir le formulaire de commande en indiquant toutes les informations demandées</li>
                  <li>Valider le mode de livraison et les frais associés</li>
                  <li>Accepter les présentes CGV</li>
                  <li>Valider le mode de paiement et procéder au paiement</li>
                </ul>
                <p className="mt-4">
                  Trott-E-Perf se réserve le droit de refuser ou d'annuler toute commande d'un Client avec lequel il
                  existerait un litige relatif au paiement d'une commande antérieure ou pour tout autre motif légitime.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 4 - Modalités de paiement</h2>
                <p>
                  Le paiement s'effectue en ligne, au moment de la commande, par carte bancaire (Visa, MasterCard, etc.)
                  via un système de paiement sécurisé.
                </p>
                <p>
                  Trott-E-Perf propose également le paiement en plusieurs fois sans frais via des partenaires de crédit.
                </p>
                <p>
                  La commande est considérée comme définitive après confirmation du paiement par l'établissement bancaire du Client.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 5 - Livraison</h2>
                <p>
                  Les produits sont livrés à l'adresse indiquée par le Client lors de la commande, dans le délai indiqué
                  sur la page de validation de la commande.
                </p>
                <p>
                  En cas de retard de livraison, le Client sera informé par email. Il pourra alors annuler sa commande
                  si le délai de livraison excède de 7 jours ouvrés le délai initialement annoncé.
                </p>
                <p>
                  À la réception des produits, le Client doit vérifier l'état de l'emballage et la conformité des produits
                  reçus. En cas de dommage pendant le transport ou de non-conformité, le Client doit le signaler dans les
                  conditions de l'article 7 des présentes CGV.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 6 - Droit de rétractation</h2>
                <p>
                  Conformément aux dispositions légales en vigueur, le Client dispose d'un délai de 14 jours à compter
                  de la réception des produits pour exercer son droit de rétractation, sans avoir à justifier de motifs
                  ni à payer de pénalités.
                </p>
                <p>
                  Pour exercer son droit de rétractation, le Client doit notifier sa décision par écrit (email, formulaire
                  sur le site ou courrier) avant l'expiration du délai de 14 jours.
                </p>
                <p>
                  Le Client devra retourner les produits à Trott-E-Perf, dans leur état d'origine et complets, dans un
                  délai maximum de 14 jours suivant la communication de sa décision de se rétracter.
                </p>
                <p>
                  Les frais de retour sont à la charge du Client.
                </p>
                <p>
                  Trott-E-Perf remboursera au Client tous les paiements reçus, y compris les frais de livraison (à l'exception
                  des frais supplémentaires découlant du choix d'un mode de livraison autre que le mode standard proposé), dans
                  un délai de 14 jours à compter de la date à laquelle Trott-E-Perf est informé de la décision du Client de se
                  rétracter, ou à compter de la récupération des produits par Trott-E-Perf, la date retenue étant celle du premier
                  de ces faits.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 7 - Garanties</h2>
                <p>
                  Tous les produits vendus par Trott-E-Perf bénéficient de la garantie légale de conformité (articles L.217-4
                  et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants
                  du Code civil).
                </p>
                <p>
                  Les produits peuvent également bénéficier d'une garantie commerciale dont les conditions sont précisées
                  dans la fiche produit et/ou dans les documents accompagnant le produit.
                </p>
                <p>
                  Pour mettre en œuvre la garantie, le Client doit contacter le service client de Trott-E-Perf dans les
                  meilleurs délais et fournir tous les éléments justificatifs nécessaires (facture, photos, description du défaut).
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 8 - Responsabilité</h2>
                <p>
                  Trott-E-Perf ne pourra être tenu responsable des dommages directs ou indirects causés au Client ou à des
                  tiers du fait de l'utilisation des produits achetés sur le site www.trott-e-perf.com, notamment en cas
                  d'utilisation non conforme aux préconisations de Trott-E-Perf.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 9 - Propriété intellectuelle</h2>
                <p>
                  Tous les textes, commentaires, ouvrages, illustrations, images et éléments audio et vidéo reproduits ou
                  représentés sur le site www.trott-e-perf.com sont strictement réservés au titre du droit d'auteur ainsi
                  qu'au titre de la propriété intellectuelle, pour toute la durée de protection de ces droits et pour le
                  monde entier.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 10 - Données personnelles</h2>
                <p>
                  Trott-E-Perf collecte et traite les données personnelles des Clients conformément à sa Politique de confidentialité,
                  disponible sur le site www.trott-e-perf.com.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">Article 11 - Droit applicable et litiges</h2>
                <p>
                  Les présentes CGV sont soumises au droit français.
                </p>
                <p>
                  En cas de litige, le Client s'adressera en priorité à Trott-E-Perf pour tenter de trouver une solution amiable.
                </p>
                <p>
                  À défaut de résolution amiable, le litige sera porté devant les tribunaux français compétents.
                </p>
                <p>
                  Le Client est également informé qu'il peut recourir à une médiation conventionnelle, notamment auprès de
                  la Commission de la médiation de la consommation ou auprès des instances de médiation sectorielles existantes,
                  ou à tout mode alternatif de règlement des différends.
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
