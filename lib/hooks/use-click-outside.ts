import { useEffect, RefObject } from "react";

/**
 * Hook pour détecter les clics en dehors d'un élément référencé
 * @param ref La référence à l'élément à surveiller
 * @param handler La fonction à appeler lorsqu'un clic est détecté en dehors de l'élément
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Ne rien faire si le clic est sur l'élément lui-même ou ses enfants
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    // Ajouter les écouteurs d'événements
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Nettoyer les écouteurs d'événements
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Se réexécuter si la ref ou le handler change
}
