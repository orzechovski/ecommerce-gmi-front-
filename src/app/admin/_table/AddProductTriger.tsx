import Icon from '@/components/global/Icon'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useProductDialogStore from '@/store/useProductDialogStore'

type AddProductTrigerProps = {
  className?: string
}

const AddProductTriger: React.FC<AddProductTrigerProps> = ({ className }) => {
  const { setOpen } = useProductDialogStore()
  return (
    <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
      Add Product
      <Icon name="plus" size={16} />
    </Button>
  )
}

export default AddProductTriger
