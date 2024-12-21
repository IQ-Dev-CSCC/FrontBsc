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

interface BlacklistEntry {
  id: string;
  attributes: {
    nom: string;
    prenom: string;
    reason: string;
    dateAdded: string;
    status: boolean; // Active or not
  };
}

export default function Blacklist() {
  const [blacklist, setBlacklist] = useState<BlacklistEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch blacklist data
  useEffect(() => {
    async function fetchBlacklist() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/blacklist-schemas`
        );
        const data = await response.json();
        setBlacklist(data.data || []);
      } catch (error) {
        console.error("Error fetching blacklist:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlacklist();
  }, []);

  // Handle deleting an entry
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blacklist-schemas/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete blacklist entry");
      }
      setBlacklist((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="rounded-md border p-8">
      <h2 className="text-3xl font-bold mb-4">Blacklist</h2>
      {loading && <p>Loading blacklist...</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Raison</TableHead>
            <TableHead>Date d'ajout</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blacklist.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.nom}</TableCell>
              <TableCell>{entry.prenom}</TableCell>
              <TableCell>{entry.reason}</TableCell>
              <TableCell>{entry.dateAdded}</TableCell>
              <TableCell>
                <Badge
                  variant={entry.status ? "secondary" : "outline"}
                >
                  {entry.status ? "Actif" : "Inactif"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  onClick={() => console.log("Edit entry:", entry.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(entry.id)}
                >
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
