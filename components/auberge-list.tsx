"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import dynamic from "next/dynamic";

// Load the Map component dynamically to prevent server-side rendering issues
const MapWithNoSSR = dynamic(() => import("./map"), {
  ssr: false,
});

interface Auberge {
  id: string;
  attributes: {
    nom: string;
    adresse: string;
    email: string;
    capacite: number;
    availability: boolean;
    createdAt: string;
    documentId: string;
    latitude: string;
    longitude: string;
    nbr_personne_reserve: number;
    offres: string;
    publishedAt: string;
    telephone: string;
    type: string;
    updatedAt: string;
  };
}



export function AubergesList() {
  const [residents, setResidents] = useState<Auberge[]>([]);
  const onLocationChange = (latitude: number, longitude: number) => {
    console.log("Location changed", latitude, longitude);
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/hauberge-schemas?populate=imageList`
        );
        const data = await response.json();
        setResidents(data.data); // Adjust based on Strapi's response structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    const interval = setInterval(fetchData,   10000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Capacité</TableHead>
            <TableHead>Disponibilité</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Offres</TableHead>
            <TableHead>Nombre de personnes réservées</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Localisation
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {residents.map((auberge: Auberge) => (
            <TableRow key={auberge.id}>
              <TableCell className="font-medium">{auberge.nom}</TableCell>
              <TableCell>{auberge.adresse}</TableCell>
              <TableCell>{auberge.email}</TableCell>
              <TableCell>{auberge.capacite}</TableCell>
              <TableCell>
                <Badge variant={auberge.availability ? "secondary" : "outline"}>
                  {auberge.availability ? "Disponible" : "Indisponible"}
                </Badge>
              </TableCell>

              <TableCell className="font-medium">{auberge.telephone}</TableCell>
              <TableCell className="font-medium">{auberge.type}</TableCell>
              <TableCell className="font-medium">{auberge.offres}</TableCell>
              <TableCell className="font-medium">{auberge.nbr_personne_reserve}</TableCell>
              <TableCell className="font-medium">{auberge.createdAt}</TableCell>
              <TableCell>
                
                  <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL2}${auberge.imageList[0].formats.thumbnail.url}`} alt="auberge" width="200" height="200" loading="lazy" />
              
              </TableCell>
              <TableCell className="font-medium w-1/3">
                <MapWithNoSSR 
                latitude={auberge.latitude}
                longitude={auberge.longitude}
                onLocationChange={onLocationChange} 
                />
              </TableCell>
              

              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
