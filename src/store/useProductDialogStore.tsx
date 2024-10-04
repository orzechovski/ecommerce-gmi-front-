import { ProductDefaultValues } from '@/app/admin/_table/ProductForm'
import { create } from 'zustand'

export type ProductEditDataType = ProductDefaultValues & { id: string }
export type ProductDialogStoreType = {
  data: ProductEditDataType | null
  open: boolean
  setData: (data: ProductEditDataType | null) => void
  setOpen: (open: boolean) => void
}

const useProductDialogStore = create<ProductDialogStoreType>((set) => ({
  open: false,
  data: null,
  setOpen: (open) => set({ open }),
  setData: (data) => set({ data })
}))

export default useProductDialogStore
