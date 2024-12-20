"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";

// Load the Map component dynamically to prevent server-side rendering issues
const MapWithNoSSR = dynamic(() => import("./map"), {
  ssr: false,
});

interface Auberge {
  nom: string;
  capacite: number;
  type: string;
  adresse: string;
  email: string;
  telephone: string;
  latitude: string;
  longitude: string;
  nbr_personne_reserve: number;
  availabilite: boolean;
  offres: string;
  imageList: string[];
  password: string;
}

export function AddAubergeButton() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Auberge>({
    nom: "",
    capacite: 1,
    type: "maison",
    adresse: "",
    email: "",
    telephone: "",
    latitude: "",
    longitude: "",
    nbr_personne_reserve: 0,
    availabilite: true,
    offres: "hebergement",
    imageList: [],
    password: "",
  });
  const [location, setLocation] = useState({ latitude: 36.737232, longitude: 3.086472 });

  const handleLocationChange = (latitude: number, longitude: number) => {
    setLocation({ latitude, longitude });
    setFormData((prev) => ({ ...prev, latitude: latitude.toString(), longitude: longitude.toString() }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const base64Images = await Promise.all(
        Array.from(files).map((file) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file); // Convert file to Base64
          });
        })
      );
  
      setFormData((prev) => ({
        ...prev,
        imageList: base64Images, // Update `imageList` with Base64 images
      }));
  
      console.log("Updated formData with imageList:", base64Images); // Debug
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Step 1: Convert Base64 images to Blob files and upload them using FormData
      const uploadedFileIds = await Promise.all(
        formData.imageList.map(async (base64Image, index) => {
          // Convert Base64 string to Blob
          const byteString = atob(base64Image.split(",")[1]); // Decode Base64
          const mimeString = base64Image.split(",")[0].split(":")[1].split(";")[0]; // Extract MIME type
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
  
          // Create FormData and append the Blob
          const formData = new FormData();
          formData.append("files", blob, `uploaded_image_${index + 1}.png`); // Add a file name
  
          // Upload the file
          const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`, {
            method: "POST",
            body: formData,
          });
  
          if (!res.ok) {
            const error = await res.json();
            throw new Error(error?.error?.message || "File upload failed");
          }
  
          const result = await res.json();
          return result[0].id; // Get the file ID from the response
        })
      );
  
      console.log("Uploaded file IDs:", uploadedFileIds);
  
      // Step 2: Prepare the payload
      const payload = {
        nom: formData.nom,
        capacite: formData.capacite,
        type: formData.type,
        adresse: formData.adresse,
        email: formData.email,
        telephone: formData.telephone,
        latitude: formData.latitude,
        longitude: formData.longitude,
        nbr_personne_reserve: formData.nbr_personne_reserve,
        availabilite: formData.availabilite,
        offres: formData.offres,
        imageList: uploadedFileIds, // Use uploaded file IDs
        password: formData.password,
      };
  
      console.log("Payload to send:", JSON.stringify(payload, null, 2));
  
      // Step 3: Create the entity with the uploaded file IDs
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/hauberge-schemas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: payload }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error?.message || "Failed to add auberge");
      }
  
      const result = await response.json();
      console.log("Auberge added successfully:", result);
      setOpen(false); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error adding auberge:", error);
    }
  };
  
  
  
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Ajouter un Auberge</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un auberge</DialogTitle>
          <DialogDescription>
            Remplissez les informations du nouveau auberge.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">
              Nom
            </Label>
            <Input id="nom" className="col-span-3" value={formData.nom} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacite" className="text-right">
              Capacité
            </Label>
            <Input
              type="number"
              id="capacite"
              className="col-span-3"
              value={formData.capacite}
              onChange={handleChange}
              min={1}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("type", value)}
              defaultValue={formData.type}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maison">Maison</SelectItem>
                <SelectItem value="auberge">Auberge</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="adresse" className="text-right">
              Adresse
            </Label>
            <Input id="adresse" className="col-span-3" value={formData.adresse} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" className="col-span-3" value={formData.email} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telephone" className="text-right">
              Téléphone
            </Label>
            <Input id="telephone" className="col-span-3" value={formData.telephone} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="availabilite" className="text-right">
              Disponibilité
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("availabilite", value)}
              defaultValue={formData.availabilite ? "true" : "false"}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionnez la disponibilité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Disponible</SelectItem>
                <SelectItem value="false">Non disponible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="offres" className="text-right">
              Offres
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("offres", value)}
              defaultValue={formData.offres}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionnez les offres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hebergement">Hébergement</SelectItem>
                <SelectItem value="restauration">Restauration</SelectItem>
              </SelectContent>
            </Select>

          </div>

          <div>
            <Label>Localisation</Label>
            <p className="text-sm text-muted-foreground">
              Cliquez sur la carte pour sélectionner la latitude et la longitude.
            </p>
            <MapWithNoSSR
              latitude={location.latitude}
              longitude={location.longitude}
              onLocationChange={handleLocationChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageList" className="text-right">
              Images
            </Label>
            <Input
              type="file"
              id="imageList"
              className="col-span-3"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="nbr_personne_reserve" className="text-right">
            Password 
          </Label>
          <Input
            type="password"
            id="password"
            className="col-span-3"
            value={formData.password}
            onChange={handleChange}
          />
        </div>


        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>Enregistrer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
