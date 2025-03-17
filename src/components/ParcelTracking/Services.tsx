import React from 'react';
import { PiggyBank, MapPin, HelpCircle, Scale, Users, Lock, Recycle } from 'lucide-react';

export function Services() {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bloc-seo-list space-y-12">
          <div className="bg-white rounded-lg p-6">
            <div className="bloc-seo-head flex items-start gap-4 mb-4">
              <PiggyBank className="w-8 h-8 text-[#8b1850] flex-shrink-0" />
              <h3 className="text-2xl font-bold text-gray-900">
                Envoyer un colis pas cher avec Mondial Relay
              </h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Mondial Relay livre aux meilleurs prix tous vos colis dans plusieurs pays d'Europe. Notre solution de livraison hors-domicile vous permet d'économiser plus de 40 % sur vos envois, et avec un délai moyen de livraison de 3 jours ouvrés en France Métropolitaine.
              </p>
              <p>
                Découvrez comment faire des économies en expédiant vos colis pas chers grâce à notre service de livraison qualitatif, écologique et économique !
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="bloc-seo-head flex items-start gap-4 mb-4">
              <MapPin className="w-8 h-8 text-[#8b1850] flex-shrink-0" />
              <h3 className="text-2xl font-bold text-gray-900">
                Optez pour la livraison de proximité
              </h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Pour réduire vos coûts d'envoi, n'attendez plus et choisissez la livraison de proximité !<br />
                Nous disposons de deux options de livraison de proximité : les Points Relais® et les Lockers.
              </p>
              <p>
                Choisir une de ces options de livraison constitue un gain de temps et d'argent.<br />
                C'est une alternative peu coûteuse aux tarifs très attractifs qui vous permettra d'envoyer vos colis simplement et efficacement à l'international. Notre réseau de 11 000 Points Relais® et 6 000 Lockers en France métropolitaine, vous assure une proximité quelque soit votre lieu de livraison.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="bloc-seo-head flex items-start gap-4 mb-4">
              <HelpCircle className="w-8 h-8 text-[#8b1850] flex-shrink-0" />
              <h3 className="text-2xl font-bold text-gray-900">
                Comment utiliser les services Mondial Relay ?
              </h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Sélectionnez un Point Relais® ou un Locker proche de votre domicile ou de votre lieu de travail sur notre site ou notre application et déposez votre envoi dans celui-ci. Le transport de colis se fera ensuite de Point Relais® à Point Relais® ou de Locker à Locker. Votre destinataire n'a plus qu'à choisir son Point Relais® ou son Locker de retrait et a 8 jours pour aller le récupérer.
              </p>
              <p>
                Ce mode de livraison facile, rapide et sécurisé vous permet d'expédier à un prix compétitif. Mondial Relay propose ainsi des tarifs d'expédition dès 4,20 € !
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="bloc-seo-head flex items-start gap-4 mb-4">
              <Scale className="w-8 h-8 text-[#8b1850] flex-shrink-0" />
              <h3 className="text-2xl font-bold text-gray-900">
                Optimisez le poids de vos colis
              </h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Nos tarifs d'expédition dépendent du poids de vos colis. Si vous souhaitez envoyer un colis moins cher, il est alors primordial d'optimiser le poids et la dimension de vos expéditions pour réduire le coût de votre envoi.
              </p>
              <p>
                La première chose à faire est de <a href="#" className="text-[#8b1850] hover:underline">choisir un emballage</a> aux dimensions de votre article, un emballage ni trop large, ni trop petit. De plus, un conditionnement trop large crée de l'espace dans votre colis et peut alors endommager votre produit.
              </p>
              <p>
                Pour réduire le poids de vos colis, privilégiez les enveloppes à bulles ou les sachets résistants. Ce type d'emballage est particulièrement conseillé pour les petits envois, les produits textiles et les articles non-fragiles.
              </p>
              <p>
                Pour les envois plus importants qui nécessitent un emballage plus grand, n'oubliez pas qu'il est indispensable de rembourrer votre colis de protection. Optez alors pour du calage léger comme du papier kraft, des coussins d'air ou encore du papier bulle.
              </p>
              <p>
                En réduisant le poids et la taille de votre colis au maximum, vous minimiserez les frais d'expédition et vous rendrez votre colis moins cher à envoyer !
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="bloc-seo-head flex items-start gap-4 mb-4">
              <Users className="w-8 h-8 text-[#8b1850] flex-shrink-0" />
              <h3 className="text-2xl font-bold text-gray-900">
                Envoi de colis entre particuliers
              </h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Avec Mondial Relay, l'envoi de colis de particulier à particulier n'a jamais été aussi simple. Ventes d'anciens vêtements ou livraisons de cadeaux pour vos proches, notre solution d'envoi de colis entre particuliers est rapide, facile et peu coûteuse.
              </p>
              <p>
                Notre réseau de plus de 11 000 Points Relais® et 6 000 Lockers vous permet d'envoyer des colis efficacement, à proximité de votre domicile ou de votre lieu de travail. Votre destinataire lui aussi pourra recevoir son colis dans le Point Relais® ou le Locker de son choix.
              </p>
              <p>
                Notre offre de livraison vous permet à vous particuliers, d'expédier vos colis en France ou à l'étranger et de bénéficier d'une assurance forfaitaire pour chacun de vos envois. Alors n'attendez plus, pour envoyer vos colis entre particuliers, choisissez Mondial Relay !
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="bloc-seo-head flex items-start gap-4 mb-4">
              <Lock className="w-8 h-8 text-[#8b1850] flex-shrink-0" />
              <h3 className="text-2xl font-bold text-gray-900">
                Protégez votre colis
              </h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Votre colis a certainement de la valeur pour vous mais il aura également de la valeur pour votre destinataire. Vous pouvez assurer votre colis pour couvrir le bien qui s'y trouve. Retrouvez toutes les informations nécessaires sur notre page dédiée.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="bloc-seo-head flex items-start gap-4 mb-4">
              <Recycle className="w-8 h-8 text-[#8b1850] flex-shrink-0" />
              <h3 className="text-2xl font-bold text-gray-900">
                Pensez à recycler vos emballages !
              </h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Chez Mondial Relay, le respect de l'environnement est un objectif majeur. Recycler vos emballages est un excellent moyen de réduire le coût de vos envois tout en protégeant l'environnement. Plutôt que d'acheter des emballages, recycler des anciens conditionnements vous coûtera bien moins cher.
              </p>
              <p>
                Il existe plusieurs façons de se procurer des emballages déjà utilisés.
              </p>
              <p>
                Demandez autour de vous, à vos amis, à votre famille.<br />
                Faites livrer vos colis en Point Relais® et demander des emballages aux commerçants de proximité. Les boutiques reçoivent leurs stocks régulièrement et seront ravies de vous offrir leurs cartons et autres emballages.<br />
                Dès que vous commandez un colis sur Internet ou via des plateformes de particulier à particulier, gardez l'emballage pour pouvoir l'utiliser à votre tour.
              </p>
              <p>
                Vous l'aurez compris, chez Mondial Relay, l'efficacité ça nous connait ! Nous mettons tout en œuvre pour vous proposer le meilleur service pour l'envoi et la livraison de colis, le moins cher possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}