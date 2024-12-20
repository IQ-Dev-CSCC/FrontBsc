"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from 'lucide-react'

const residents = [
  {
    id: "1",
    nom: "Dubois",
    prenom: "Jean",
    numero_chambre: "A101",
    date_entree: "2024-01-15",
    date_sortie: "2024-02-15",
    type_reservation: "Gratuit",
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Sophie",
    numero_chambre: "B205",
    date_entree: "2024-01-10",
    date_sortie: "2024-03-10",
    type_reservation: "Non Gratuit",
  },
  {
    id: "3",
    nom: "Bernard",
    prenom: "Michel",
    numero_chambre: "C304",
    date_entree: "2024-01-20",
    date_sortie: "2024-02-20",
    type_reservation: "Juste nourriture",
  },
]

export function AubergesList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Chambre</TableHead>
            <TableHead>Date d&apos;entrée</TableHead>
            <TableHead>Date de sortie</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {residents.map((resident) => (
            <TableRow key={resident.id}>
              <TableCell className="font-medium">{resident.nom}</TableCell>
              <TableCell>{resident.prenom}</TableCell>
              <TableCell>{resident.numero_chambre}</TableCell>
              <TableCell>{resident.date_entree}</TableCell>
              <TableCell>{resident.date_sortie}</TableCell>
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
  )
}

