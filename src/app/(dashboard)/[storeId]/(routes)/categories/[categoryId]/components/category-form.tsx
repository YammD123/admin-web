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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banner, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { set, z } from "zod";
interface CategoryFormProps {
  initialData: Category | null;
  banners:Banner[]
}

const formSchema = z.object({
  name: z.string().min(1),
  bannerId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export default function CategoryForm({ initialData,banners }: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      bannerId: "",
    },
  });
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const origin = useorigin();
  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData
    ? "Edit Category toko"
    : "Create Category toko";
  const toastMessage = initialData
    ? "Category berhasil edit"
    : "Category berhasil buat";
  const action = initialData ? "Simpan Category" : "Buat Category";

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Data berhasil diupdate");
    } catch (error) {
      toast.error("cek kembali data yang diinput");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
      router.push("/");
      toast.success(toastMessage);
      router.refresh();
    } catch (error) {
      toast.error("gagal menghapus data");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
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
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Nama Categori"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="bannerId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Banner</FormLabel>
                    <FormControl>
                      <Select
                       disabled={loading}
                       onValueChange={field.onChange}
                       value={field.value}
                       defaultValue={field.value}
                       >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                             defaultValue={field.value}
                             placeholder="Pilih Banner"
                             />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {banners.map((banner)=>(
                            <SelectItem key={banner.id} value={banner.id}>
                              {banner.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
      <Separator />
    </>
  );
}
