"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface settingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name:z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>

export default function SettingsForm({ initialData }: settingsFormProps) {
  const form = useForm<SettingsFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues: initialData,
  })

  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button variant={"destructive"} size="sm" onClick={() => {}}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator/>
      <Form {...form}>
        <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-8">
            <FormField control={form.control} name="name" render={({field})=>{
              return(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="nama toko"/>
                </FormControl>
              </FormItem>  
              )
            }}/>
          </div>
        </form>
      </Form>
    </>
  );
}
