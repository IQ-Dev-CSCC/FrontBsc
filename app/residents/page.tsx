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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Auberge {
  id: string;
  attributes: {
    nom: string;
  };
}

interface Resident {
  id: string;
  attributes: {
    nom: string;
    prenom: string;
    date_naissance: string;
    numero_chambre: number;
    type_reservation: string;
  };
}

export default function ResidentsPage() {
  const [auberges, setAuberges] = useState<Auberge[]>([]);
  const [selectedAuberge, setSelectedAuberge] = useState<string | null>(null);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Auberges
  useEffect(() => {
    async function fetchAuberges() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/hauberge-schemas`
        );
        const data = await response.json();
        setAuberges(data.data || []);
      } catch (error) {
        console.error("Error fetching auberges:", error);
      }
    }

    fetchAuberges();
  }, []);

  // Fetch Residents of Selected Auberge
  useEffect(() => {
    if (!selectedAuberge) return;

    async function fetchResidents() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/residant-schemas?filters[hauberge_schema][id][$eq]=${selectedAuberge}`
        );
        const data = await response.json();
        setResidents(data.data || []);
      } catch (error) {
        console.error("Error fetching residents:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResidents();
  }, [selectedAuberge]);

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Résidents</h2>

        {/* Select Auberge */}
        <Select onValueChange={(value) => setSelectedAuberge(value)}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Sélectionnez un auberge" />
          </SelectTrigger>
          <SelectContent>
            {auberges.map((auberge) => (
              <SelectItem key={auberge.id} value={auberge.id}>
                {auberge.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading && <p>Chargement des résidents...</p>}

      {!loading && selectedAuberge && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Date de Naissance</TableHead>
                <TableHead>Chambre</TableHead>
                <TableHead>Type de Réservation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell>{resident.nom}</TableCell>
                  <TableCell>{resident.prenom}</TableCell>
                  <TableCell>{resident.date_naissance}</TableCell>
                  <TableCell>{resident.numero_chambre}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        resident.type_reservation === "Gratuit"
                          ? "secondary"
                          : resident.type_reservation === "Non Gratuit"
                          ? "default"
                          : "outline"
                      }
                    >
                      {resident.type_reservation}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
