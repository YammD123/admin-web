"use client";
import * as z from "zod";
import { useStoreModal } from "@/app/hooks/use-store-modal";
import Modal from "../modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function StoreModal() {
  //ini zod untuk validas minimal string 1 dari library
  const storeModal = useStoreModal();
  const formScema = z.object({
    name: z.string().min(1),
  });

  //ini react hook form agar form validasi otomatis berdasarkan skema yang di buat
  const form = useForm<z.infer<typeof formScema>>({
    resolver: zodResolver(formScema),
    defaultValues: {
      name: "",
    },
  });

    //On Submit menangani data dikirim
    const [loading,setLoading]=useState(false)
    const router=useRouter()
  const onSubmit = async (value: z.infer<typeof formScema>) => {
    // TODO buat toko
    try {
      setLoading(true)
      const respone = await axios.post('/api/stores',value)
      router.push(`/${respone.data.id}`)
      console.log(respone.data);
      toast.success('berhasil bikin toko')
    } catch (error) {
      toast.error('gagal bikin toko')
    }finally{
      setLoading(false)
    }
  };
  return (
    <Modal //menampilkan modal dari komponen modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="nama toko" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant={"outline"} onClick={storeModal.onClose}>Batal</Button>
                <Button disabled={loading} type="submit">lanjut</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
