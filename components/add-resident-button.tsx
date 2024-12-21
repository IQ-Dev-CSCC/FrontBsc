"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { Camera } from 'lucide-react'
import CameraDialog from "@/components/ui/camera-dialog"

function CameraButtonAndDialog({updateGender}: any) {
  const [openCam, setOpenCam] = useState(false);
  const [idImageProcess, setIdImageProcess] = useState<any>(null);

  useEffect(() => {
    if (idImageProcess) {
      console.log(idImageProcess);
      const fName = idImageProcess.first_name;
      const lName = idImageProcess.last_name;
      const birthDate = idImageProcess.birth_date;
      const birthPlace = idImageProcess.birth_place;
      updateGender(idImageProcess.gender ? idImageProcess.gender : "");
      const nin = idImageProcess.nin;

      (document.getElementById("nom") as HTMLInputElement)!.value = fName != undefined ? fName : "";
      (document.getElementById("prenom") as HTMLInputElement)!.value = lName != undefined ? lName : "";
      (document.getElementById("birth_date") as HTMLInputElement)!.value = birthDate != undefined ? birthDate : "";
      (document.getElementById("birth_place") as HTMLInputElement)!.value = birthPlace != undefined ? birthPlace : "";
      (document.getElementById("nin") as HTMLInputElement)!.value = nin != undefined ? nin : "";
    }
  }, [idImageProcess]);

  const toggleDialog = () => setOpenCam(!openCam);

  return (
      <div>
          <button onClick={toggleDialog} className="max-w-[140px] flex flex-col items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <Camera />
            Scanner Carte
          </button>
          {<CameraDialog run={openCam} getIdData={setIdImageProcess} />}
      </div>
  );
};

export function AddResidentButton() {
  const [open, setOpen] = useState(false)
  const [showPaiement, setShowPaiement] = useState(false);
  const [receipt, setReceipt] = useState('');
  const [selectedGender, setSelectedGender] = useState('');


  useEffect(() => {
    
  }, []);

  const handleTypeSelectChange = (selectedValue: string) => {
    if (selectedValue === 'paid' || selectedValue === 'feed') {
      setShowPaiement(true);
      setReceipt(Math.floor(10000000 + Math.random() * 90000000).toString());
    } else {
      setShowPaiement(false);
      setReceipt('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Ajouter un résident</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un résident</DialogTitle>
          <DialogDescription>
            Remplissez les informations du nouveau résident
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4 py-4">
            <div className="grid gap-4">
              <div className="gap-4">
                <Label htmlFor="nom" className="text-right">
                  Nom
                </Label>
                <Input id="nom" className="col-span-3" />
              </div>
              <div className="gap-4">
                <Label htmlFor="prenom" className="text-right">
                  Prénom
                </Label>
                <Input id="prenom" className="col-span-3" />
              </div>
              <div className="gap-4">
                <Label htmlFor="birth_date" className="text-right">
                  Date de Naissance
                </Label>
                <Input type="date" id="birth_date" className="col-span-3" />
              </div>
              <div className="gap-4">
                <Label htmlFor="birth_place" className="text-right">
                  Lieu de Naissance
                </Label>
                <Input id="birth_place" className="col-span-3" />
              </div>
              <div className="gap-4">
                <Label htmlFor="gender" className="text-right">
                  Sexe
                </Label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger id="gender" className="col-span-3">
                    <SelectValue placeholder="Sélectionnez le sexe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="gap-4">
                <Label htmlFor="nin" className="text-right">
                  NIN
                </Label>
                <Input id="nin" className="col-span-3" />
              </div>
            </div>
            <div>OU</div>
            <CameraButtonAndDialog updateGender={setSelectedGender} />
          </div>
          <div className="gap-4">
            <Label htmlFor="parent_permission" className="text-right">
              Licence parentale pour les mineurs
            </Label>
            <Input type="file" id="parent_permission" className="col-span-3" />
          </div>
          <div className="gap-4">
            <Label htmlFor="chambre" className="text-right">
              Chambre
            </Label>
            <Input id="chambre" className="col-span-3" />
          </div>
          <div className="gap-4">
            <Label htmlFor="enter_date" className="text-right">
              Date d'entrée
            </Label>
            <Input id="enter_date" className="col-span-3" />
          </div>
          <div className="gap-4">
            <Label htmlFor="leave_date" className="text-right">
              Date de sortie
            </Label>
            <Input id="leave_date" className="col-span-3" />
          </div>
          <div className="gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select onValueChange={handleTypeSelectChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Gratuit</SelectItem>
                <SelectItem value="paid">Non Gratuit</SelectItem>
                <SelectItem value="feed">Juste Nourriture</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {showPaiement && (
            <div id="paiement" className="gap-4">
              <Label htmlFor="price" className="text-right">
                Montant
              </Label>
              <div className="col-span-2">
                <Input type="number" id="price" min={0} className="col-span-3" />
              </div>
              <p className="text-sm"><span className="font-bold">Num Reçu:</span> <span id="receipt">{receipt}</span></p>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

