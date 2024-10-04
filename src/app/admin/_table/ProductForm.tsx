'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import IconLoad from '@/components/global/IconLoad'
import { Save } from 'lucide-react'
import BaseInput from '@/components/auth/BaseInput'
import useProductDialogStore from '@/store/useProductDialogStore'
import {
  getProductsControllerFindAllQueryKey,
  useProductsControllerCreate,
  useProductsControllerUpdate
} from '@/app/api/generated/products/products'
import { toast } from 'sonner'
import useInvalidate from '@/hooks/useInvalidate'

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long'
    })
    .max(255, {
      message: 'Title must be at most 255 characters long'
    }),
  description: z
    .string()
    .min(3, {
      message: 'Description must be at least 3 characters long'
    })
    .max(255, {
      message: 'Description must be at most 255 characters long'
    }),
  price: z.coerce.number().min(1, {
    message: 'Price must be at least 1'
  }),
  stock: z.coerce.number().min(1, {
    message: 'Stock must be at least 1'
  })
})

export type ProductDefaultValues = z.infer<typeof formSchema>

const ProductForm = () => {
  const { data: productData, setOpen, setData } = useProductDialogStore()
  const { mutate: editProduct, isPending: editPending } =
    useProductsControllerUpdate()
  const { mutate: addProduct, isPending: addPending } =
    useProductsControllerCreate()

  const invalidate = useInvalidate()
  const queryKeys = [...getProductsControllerFindAllQueryKey()]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: productData ?? {
      title: '',
      description: '',
      price: 0,
      stock: 0
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (productData) {
      editProduct(
        {
          id: productData.id,
          data
        },
        {
          onSuccess: () => {
            toast.success('Product updated')
            invalidate(queryKeys)
            setOpen(false)
            setData(null)
          },
          onError: (error: any) => {
            toast.error(error.message || 'An error occurred')
          }
        }
      )
    } else {
      addProduct(
        {
          data
        },
        {
          onSuccess: () => {
            toast.success('Product added')
            invalidate(queryKeys)
            setOpen(false)
            setData(null)
          },
          onError: (error: any) => {
            toast.error(error.message || 'An error occurred')
          }
        }
      )
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6  w-full sm:p-6 p-4"
      >
        <BaseInput
          name="title"
          placeholder="Product title"
          description="Describe your product"
          label="Title"
        />
        <BaseInput
          name="description"
          placeholder="Product description"
          description="Describe your product"
          label="Description"
        />
        <BaseInput
          type="number"
          name="price"
          placeholder="Product price"
          description="Describe your product"
          label="Price"
        />
        <BaseInput
          type="number"
          name="stock"
          placeholder="Product stock"
          description="Describe your product"
          label="Stock"
        />
        <Button
          type="submit"
          className="mt-6 text-base flex items-center gap-2"
        >
          Save{' '}
          <IconLoad isLoading={editPending || addPending}>
            <Save size={18} className="text-white" />
          </IconLoad>
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm
