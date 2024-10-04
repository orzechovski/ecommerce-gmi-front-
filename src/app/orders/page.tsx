'use client'
import Menu from '@/components/menu/Menu'
import { useOrdersControllerGetOrders } from '../api/generated/orders/orders'
import { useSession } from 'next-auth/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatDate } from '@/lib/formatDate'

const Page = () => {
  const { data } = useSession()
  const { data: orders } = useOrdersControllerGetOrders(data?.id ?? '')

  return (
    <Menu containerClassName="p-8 flex flex-col gap-4">
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>createdAt</TableCell>
            <TableCell>payment_status</TableCell>
            <TableCell>status</TableCell>
            <TableCell>updatedAt</TableCell>
            <TableCell className="text-right">total_price</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(order?.createdAt)}</TableCell>
              <TableCell>{order?.id}</TableCell>
              <TableCell>{order?.payment_status}</TableCell>
              <TableCell>{order?.status}</TableCell>
              <TableCell>{formatDate(order?.updatedAt)}</TableCell>
              <TableCell className="text-right">
                {order?.total_price.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Menu>
  )
}

export default Page
