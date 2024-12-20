import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const bookings = [
  {
    guest: "Sarah Johnson",
    inn: "Sunset Valley Inn",
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    status: "Confirmed",
  },
  {
    guest: "Michael Chen",
    inn: "Harbor View Lodge",
    checkIn: "2024-01-21",
    checkOut: "2024-01-23",
    status: "In Progress",
  },
  {
    guest: "Emma Wilson",
    inn: "Mountain Peak Resort",
    checkIn: "2024-01-22",
    checkOut: "2024-01-28",
    status: "Pending",
  },
  {
    guest: "James Brown",
    inn: "Lakeside Haven",
    checkIn: "2024-01-23",
    checkOut: "2024-01-26",
    status: "Confirmed",
  },
  {
    guest: "Lisa Garcia",
    inn: "Forest Glen Inn",
    checkIn: "2024-01-24",
    checkOut: "2024-01-27",
    status: "Pending",
  },
]

export function RecentBookings() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest</TableHead>
          <TableHead>Inn</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.guest}>
            <TableCell className="font-medium">{booking.guest}</TableCell>
            <TableCell>{booking.inn}</TableCell>
            <TableCell>{booking.checkIn}</TableCell>
            <TableCell>{booking.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

