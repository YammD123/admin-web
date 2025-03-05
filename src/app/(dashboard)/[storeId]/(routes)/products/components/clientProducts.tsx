"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { ApiList } from "@/components/api-list";

interface ProductProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product (${data.length})`}
          description="Manage Product for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} searchKey="name" columns={columns} />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList namaIndikator="products" indikator="{productId}"/>
    </>
  );
};
