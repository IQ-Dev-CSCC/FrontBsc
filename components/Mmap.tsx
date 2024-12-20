"use client";

import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { Auberge } from "@/hooks/useAuberges";

const svgIcon = encodeURIComponent(`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 12.866 12 22 12 22C12 22 19 12.866 19 9C19 5.13401 15.866 2 12 2ZM7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 10.657 14.7614 13.9142 12 18.3284C9.23858 13.9142 7 10.657 7 9Z" fill="#ff0000"/>
    <circle cx="12" cy="9" r="2.5" fill="#ff0000"/>
  </svg>
`);

const customIcon = L.divIcon({
  html: `<div style="background-image: url('data:image/svg+xml,${svgIcon}'); width: 24px; height: 24px;"></div>`,
  iconSize: [24, 24],
  className: "",
});

interface MapProps {
  auberges: Auberge[];
  focusLocation?: { latitude: number; longitude: number } | null;
}

const Map: React.FC<MapProps> = ({ auberges, focusLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([36.766, 3.477], 12); // Center on Boumerdes

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
    }

    if (mapInstanceRef.current && auberges.length > 0) {
      const markerCluster = L.markerClusterGroup();

      auberges.forEach((auberge) => {
        const marker = L.marker([auberge.latitude, auberge.longitude], { icon: customIcon });

        marker.bindPopup(`
          <div>
            <h3>${auberge.nom}</h3>
            <p><strong>Adresse:</strong> ${auberge.adresse}</p>
            <p><strong>Email:</strong> ${auberge.email}</p>
            <p><strong>Téléphone:</strong> ${auberge.telephone}</p>
            <p><strong>Capacité:</strong> ${auberge.capacite}</p>
            
          </div>
        `);

        markerCluster.addLayer(marker);
      });

      mapInstanceRef.current.addLayer(markerCluster);
    }
  }, [auberges]);

  // Focus on the selected location
  useEffect(() => {
    if (focusLocation && mapInstanceRef.current) {
      mapInstanceRef.current.setView([focusLocation.latitude, focusLocation.longitude], 15);
    }
  }, [focusLocation]);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
};

export default Map;
