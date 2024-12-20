import { AddAubergeButton } from "@/components/add-auberge-button"
import { AubergeCard } from "@/components/auberges-card"
import { AubergesList } from "@/components/auberge-list"

export default function ResidentsPage() {



  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Auberges</h2>
        <AddAubergeButton />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <AubergeCard auberge_id={1} type="auberge" name="Yusr" capacity={50} reserved={32} />
        <AubergeCard auberge_id={2} type="auberge" name="Kab Djanet" capacity={50} reserved={16} />
        <AubergeCard auberge_id={3} type="auberge" name="Zemmouri" capacity={50} reserved={22} />
        <AubergeCard auberge_id={4} type="auberge" name="Alkarma" capacity={50} reserved={7} />
        <AubergeCard auberge_id={5} type="auberge" name="Corso" capacity={50} reserved={49} />
      </div>
      <AubergesList />
    </div>
  )
}
