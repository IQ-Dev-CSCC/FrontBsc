"use client";

import React, { useState } from "react";
import Map from "@/components/Mmap";
import { useAuberges } from "@/hooks/useAuberges";

const Page = () => {
  const { auberges, filteredAuberges, filterAuberges } = useAuberges();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuberge, setSelectedAuberge] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterAuberges(query);
  };

  const handleAubergeClick = (latitude: number, longitude: number) => {
    setSelectedAuberge({ latitude, longitude });
    console.log("Selected auberge:", latitude, longitude);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Auberges à Boumerdes</h2>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4 p-2 w-full border rounded"
        />
        <ul>
          {filteredAuberges.map((auberge) => (
            <li
              key={auberge.id}
              className="mb-2 p-2 bg-white rounded shadow hover:bg-gray-200"
            >
              <h3 className="font-bold">{auberge.nom}</h3>
              <p className="text-sm">{auberge.adresse}</p>
              <button
                className="text-blue-500 underline mt-2"
                onClick={() => handleAubergeClick(auberge.latitude, auberge.longitude)}
              >
                Aller à l'emplacement
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div className="w-3/4">
        <Map auberges={filteredAuberges} focusLocation={selectedAuberge} />
      </div>
    </div>
  );
};

export default Page;
