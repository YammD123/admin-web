"use client";
import { useorigin } from "@/app/hooks/use-origin";
import { ApiAlert } from "@/components/api-alert";
import ImageUpload from "@/components/image-upload";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banner} from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { set, z } from "zod";
interface BannerFormProps {
  initialData: Banner | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageURL: z.string().min(1),
});

type BannerFormValues = z.infer<typeof formSchema>;

export default function BannerForm({ initialData }: BannerFormProps) {
  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label : "",
      imageURL : "",
    },
  });
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const origin = useorigin();
  const title = initialData ? "Edit Banner" : "Create Banner";
  const description = initialData ? "Edit Banner toko" : "Create Banner toko";
  const toastMessage = initialData ? "Banner berhasil edit" : "Banner berhasil buat";
  const action = initialData ? "Simpan Banner" : "Buat Banner";

  const onSubmit = async (data: BannerFormValues) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/${params.storeId}/banners/${params.bannerId}`,data);
      }
      else{
        await axios.post(`/api/${params.storeId}/banners`,data);
      }
      router.refresh();
      toast.success("Data berhasil diupdate");
    } catch (error) {
      toast.error("cek kembali data yang diinput");
    }finally{
      setLoading(false)
    }
  };

  const onDelete = async ()=>{
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/banners/${params.bannerId}`)
      router.push('/')
      toast.success(toastMessage)
      router.refresh()
    } catch (error) {
      toast.error("gagal menghapus data")
    }finally{
      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <>
    <AlertModal 
     isOpen={open}
     onClose={() => setOpen(false)}
     onConfirm={onDelete}
     loading={loading}/>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (

        <Button
          disabled={loading}
          variant={"destructive"}
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Label Banner"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="imageURL"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                      disabled={loading}
                      onChange={(url)=>field.onChange(url)}
                      onRemove={()=>field.onChange('')} 
                      value={field.value ? [field.value] : []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

          </div>
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
      <Separator/>

    </>
  );
}
