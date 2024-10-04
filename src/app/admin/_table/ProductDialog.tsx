import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import useProductDialogStore from '@/store/useProductDialogStore'
import ProductForm from './ProductForm'
import { useEffect } from 'react'

type ProductDialogProps = {
  className?: string
}

const ProductDialog: React.FC<ProductDialogProps> = ({ className }) => {
  const { data, open, setOpen, setData } = useProductDialogStore()

  const title = data ? 'Edit Product' : 'Create Product'
  const description = data ? 'Edit the product details' : 'Add a new product'

  useEffect(() => {
    if (!open) {
      setData(null)
    }
  }, [open])
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className={cn('max-w-2xl', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  )
}

export default ProductDialog
