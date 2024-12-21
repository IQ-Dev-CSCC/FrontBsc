import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom SVG for the marker icon
const svgIcon = encodeURIComponent(`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 12.866 12 22 12 22C12 22 19 12.866 19 9C19 5.13401 15.866 2 12 2ZM7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 10.657 14.7614 13.9142 12 18.3284C9.23858 13.9142 7 10.657 7 9Z" fill="#ff0000"/>
    <circle cx="12" cy="9" r="2.5" fill="#ff0000"/>
  </svg>
`);

const customIcon = L.divIcon({
  html: `<div style="background-image: url('data:image/svg+xml,${svgIcon}'); width: 24px; height: 24px;"></div>`,
  iconSize: [24, 24],
  className: '',
});

interface MapProps {
  latitude: number;
  longitude: number;
  onLocationChange: (latitude: number, longitude: number) => void;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, onLocationChange }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      markerRef.current = L.marker([latitude, longitude], { draggable: true, icon: customIcon }).addTo(mapInstanceRef.current);

      mapInstanceRef.current.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          if (mapInstanceRef.current) {
            markerRef.current = L.marker([lat, lng], { draggable: true, icon: customIcon }).addTo(mapInstanceRef.current);
          }
        }
        onLocationChange(lat, lng);
      });

      markerRef.current.on("dragend", () => {
        const { lat, lng } = markerRef.current!.getLatLng();
        onLocationChange(lat, lng);
      });
    }
  }, [latitude, longitude, onLocationChange]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([latitude, longitude], mapInstanceRef.current.getZoom());
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      }
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
};

export default Map;