import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="column">
        <div className="bg-white">
          <div 
            className="w-full h-48 bg-[#f5f5f5] bg-top bg-cover rounded-t-3xl"
            style={{
              backgroundImage: `url('https://cdn.discordapp.com/attachments/1325194954909417493/1336151053649051699/ezi.png?ex=67a2c323&is=67a171a3&hm=cafc43351c70e58022d5470e6b08f269aa88719f07134101acd91952e4fb4ff1&')`,
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
              <img 
                className="h-24"
                src="https://www.mondialrelay.fr/images/rebranding/footer_picto.svg" 
                alt="Footer decoration"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#96154a] text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h5 className="text-lg font-semibold mb-3">Pour nous suivre</h5>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-gray-200" title="Suivez-nous sur Linkedin">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-gray-200" title="Suivez-nous sur Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-gray-200" title="Suivez-nous sur Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-gray-200" title="Suivez-nous sur Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold mb-3">Nos solutions de paiement</h5>
                <div className="flex flex-col space-y-3">
                  <div className="flex space-x-4">
                    <img height="32" src="https://www.mondialrelay.fr/images/Responsive/payment-methods/footer/Mastercard.svg" alt="Mastercard" className="h-8" />
                    <img height="32" src="https://www.mondialrelay.fr/images/Responsive/payment-methods/footer/Visa.svg" alt="Visa" className="h-8" />
                    <img height="32" src="https://www.mondialrelay.fr/images/Responsive/payment-methods/footer/Paypal.svg" alt="Paypal" className="h-8" />
                    <img height="32" src="https://www.mondialrelay.fr/images/Responsive/payment-methods/footer/CB.svg" alt="CB" className="h-8" />
                  </div>
                  <a href="#" className="flex items-center text-white hover:text-gray-200">
                    <img src="https://www.mondialrelay.fr/images/Rebranding/ico/ico_locker.svg" alt="Lock" className="w-4 h-4 mr-2" />
                    Paiement sécurisé
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 flex-1">
                <div>
                  <h5 className="text-lg font-semibold mb-3">Particulier</h5>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-gray-200">Envoyer mon colis pas cher</a></li>
                    <li><a href="#" className="hover:text-gray-200">Suivre mon colis</a></li>
                    <li><a href="#" className="hover:text-gray-200">Envoi colis entre particuliers</a></li>
                    <li><a href="#" className="hover:text-gray-200">Comment utiliser nos Lockers ?</a></li>
                    <li><a href="#" className="hover:text-gray-200">Assurer mon colis</a></li>
                    <li><a href="#" className="hover:text-gray-200">Découvrir nos tarifs</a></li>
                    <li><a href="#" className="hover:text-gray-200">eBay by Mondial Relay</a></li>
                    <li><a href="#" className="hover:text-gray-200">Application Mobile Mondial Relay</a></li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-3">Professionnel</h5>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-gray-200">Nos offres</a></li>
                    <li><a href="#" className="hover:text-gray-200">Nos tarifs pro</a></li>
                    <li><a href="#" className="hover:text-gray-200">Nos partenaires</a></li>
                    <li><a href="#" className="hover:text-gray-200">Installer un Locker</a></li>
                    <li><a href="#" className="hover:text-gray-200">Devenir Transporteur</a></li>
                    <li><a href="#" className="hover:text-gray-200">Devenir Point Relais</a></li>
                    <li><a href="#" className="hover:text-gray-200">Découvrez notre Blog Business</a></li>
                    <li><a href="#" className="hover:text-gray-200">CGV Professionnels</a></li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-3">Liens utiles</h5>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-gray-200">C.G.V.</a></li>
                    <li><a href="#" className="hover:text-gray-200">Mentions Legales</a></li>
                    <li><a href="#" className="hover:text-gray-200">Charte des données personnelles</a></li>
                    <li><a href="#" className="hover:text-gray-200">Gestion des cookies</a></li>
                    <li><a href="#" className="hover:text-gray-200">Conditions des offres</a></li>
                    <li><a href="#" className="hover:text-gray-200">Conformité / Compliance</a></li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-3">Mondial Relay</h5>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-gray-200">Contactez-nous</a></li>
                    <li><a href="#" className="hover:text-gray-200">Qui sommes-nous ?</a></li>
                    <li><a href="#" className="hover:text-gray-200">Nos engagements RSE</a></li>
                    <li><a href="#" className="hover:text-gray-200">Nous rejoindre</a></li>
                  </ul>
                </div>
              </div>

              <div className="hidden md:block w-48">
                <img 
                  src="https://www.mondialrelay.fr/media/124466/partenaire2.png?width=200"
                  alt="Partenaire"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-3">Nos engagements et certifications</h5>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://www.mondialrelay.fr/media/123622/fevad.png"
                    alt="FEVAD"
                    className="h-14"
                  />
                  <span className="text-sm">
                    Mondial Relay adhère à la Fédération du e-commerce et de la vente à distance (FEVAD)
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="https://www.thegreenwebfoundation.org/green-web-check/?url=mondialrelay.fr">
                    <img 
                      src="https://www.mondialrelay.fr/media/123628/thegreenweb-mondialrelayfr.png"
                      alt="Green Web Foundation"
                      className="h-14"
                    />
                  </a>
                  <span className="text-sm">
                    Le site mondialrelay.fr est classé en vert par The Green Web Foundation (association loi 1901).
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}