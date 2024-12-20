import { useState, useEffect } from "react";

export interface Auberge {
  id: string;
  nom: string;
  adresse: string;
  email: string;
  telephone: string;
  capacite: number;
  latitude: number;
  longitude: number;
}

export function useAuberges() {
  const [auberges, setAuberges] = useState<Auberge[]>([]);
  const [filteredAuberges, setFilteredAuberges] = useState<Auberge[]>([]);

  useEffect(() => {
    async function fetchAuberges() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/hauberge-schemas`);
        const data = await response.json();

        const aubergesData = data.data
          .map((item: any) => ({
            id: item.id,
            nom: item.nom,
            adresse: item.adresse,
            email: item.email,
            telephone: item.telephone,
            capacite: item.capacite,
            latitude: parseFloat(item.latitude), // Ensure numerical values
            longitude: parseFloat(item.longitude), // Ensure numerical values
          }))
          .filter(
            (auberge: Auberge) =>
              !isNaN(auberge.latitude) &&
              !isNaN(auberge.longitude) &&
              auberge.latitude >= 36.7 &&
              auberge.latitude <= 36.9 &&
              auberge.longitude >= 3.4 &&
              auberge.longitude <= 3.6 // Filter for Boumerdes region
          );

        setAuberges(aubergesData);
        setFilteredAuberges(aubergesData);
      } catch (error) {
        console.error("Error fetching auberges:", error);
      }
    }

    fetchAuberges();
  }, []);

  const filterAuberges = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = auberges.filter(
      (auberge) =>
        auberge.nom.toLowerCase().includes(lowerCaseQuery) ||
        auberge.adresse.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredAuberges(filtered);
  };

  return { auberges, filteredAuberges, filterAuberges };
}
