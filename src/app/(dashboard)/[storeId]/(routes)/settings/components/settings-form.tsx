"use client"

import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { AlertModal } from '@/components/modals/alert-modal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { ApiAlert } from '@/components/api-alert'
import { useorigin } from '@/app/hooks/use-origin'

interface SettingsFormProps {
  initialData: {
    name: string
  }
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nama toko tidak boleh kosong' })
})

type SettingsFormValues = z.infer<typeof formSchema>

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const { storeId } = useParams()
  const router = useRouter()
  const origin = useorigin()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/stores/${storeId}`, data)
      router.refresh()
      toast.success('Data berhasil diupdate')
    } catch (error) {
      toast.error('Gagal update data')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${storeId}`)
      toast.success('Data berhasil dihapus')
      router.push('/')
      router.refresh()
    } catch (error) {
      toast.error('Gagal hapus data')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-lg'>Store Settings</CardTitle>
          <Button variant='destructive' size='sm' disabled={loading} onClick={() => setOpen(true)}>
            <Trash className='w-4 h-4' />
          </Button>
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Nama Toko' {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={loading} className='w-full'>
              {loading ? 'Loading...' : 'Save'}
            </Button>
          </form>
        </Form>
        <Separator />
        <ApiAlert title='PUBLIC_API_URL' description={`${origin}/api/${storeId}`} variant='public' />
      </div>
    </>
  )
}
