import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
  interface JQuery {
    MR_ParcelShopPicker: (options: any) => void;
  }
}

interface RelayPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (code: string) => void;
}

export function RelayPointModal({ isOpen, onClose, onSelect }: RelayPointModalProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCode, setSelectedCode] = useState('');
  const navigate = useNavigate();
  const scriptRefs = useRef<HTMLScriptElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      
      // Function to load script and return a promise
      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          // Check if script already exists
          const existingScript = document.querySelector(`script[src="${src}"]`);
          if (existingScript) {
            resolve();
            return;
          }

          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = () => {
            // Add a small delay after script loads
            setTimeout(resolve, 100);
          };
          script.onerror = reject;
          document.body.appendChild(script);
          scriptRefs.current.push(script);
        });
      };

      // Load both scripts in sequence
      const loadScripts = async () => {
        try {
          // First, ensure jQuery is loaded
          if (!window.jQuery) {
            await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js');
          }
          
          // Ensure jQuery is available globally
          if (window.jQuery) {
            window.$ = window.jQuery;
          }
          
          // Add a delay before loading the Mondial Relay widget
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Then load the Mondial Relay widget
          await loadScript('https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js');
          
          // Add a delay before initializing the widget
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Initialize the widget
          if (widgetRef.current && codeInputRef.current && window.jQuery) {
            const $ = window.jQuery;
            try {
              $(widgetRef.current).MR_ParcelShopPicker({
                Target: $(codeInputRef.current),
                Brand: "BDTEST  ",
                Country: "FR",
                OnParcelShopSelected: (point: any) => {
                  if (point.ID) {
                    setSelectedCode(point.ID);
                  }
                }
              });

              // Center the widget iframe once it's loaded
              const iframeCheck = setInterval(() => {
                const iframe = widgetRef.current?.querySelector('iframe');
                if (iframe) {
                  iframe.style.margin = '0 auto';
                  iframe.style.display = 'block';
                  clearInterval(iframeCheck);
                }
              }, 100);
            } catch (error) {
              console.error('Error initializing widget:', error);
            }
          }
          
          setIsLoading(false);
        } catch (error) {
          console.error('Error loading scripts:', error);
          setIsLoading(false);
        }
      };

      loadScripts();

      // Cleanup function
      return () => {
        // Remove scripts in a safe way
        scriptRefs.current.forEach(script => {
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
        scriptRefs.current = [];

        // Clean up any iframes
        const iframe = widgetRef.current?.querySelector('iframe');
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }

        // Reset widget container
        if (widgetRef.current) {
          widgetRef.current.innerHTML = '';
        }
      };
    }
  }, [isOpen]);

  const handleContinue = () => {
    if (selectedCode) {
      onSelect(selectedCode);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl p-6 relative animate-modal-appear"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#96154a]">
            Choisissez votre Point Relais®
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isLoading && (
          <div className="min-h-[500px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#96154a] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600">Chargement du widget...</p>
            </div>
          </div>
        )}

        <div 
          ref={widgetRef} 
          id="Zone_Widget" 
          className={`min-h-[500px] flex justify-center ${isLoading ? 'hidden' : 'block'}`}
        ></div>
        <input 
          type="hidden" 
          ref={codeInputRef}
          id="ParcelShopCode" 
          name="ParcelShopCode" 
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedCode}
            className={`
              px-8 py-3 rounded-xl font-medium transition-all duration-300
              ${selectedCode
                ? 'bg-[#96154a] text-white hover:bg-[#7d1240] transform hover:-translate-y-0.5 hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}