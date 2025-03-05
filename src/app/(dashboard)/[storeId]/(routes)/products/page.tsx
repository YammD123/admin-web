
import React from "react";
import { ProductClient } from "./components/clientProducts";
import db from "@/lib/db";
import { ProductColumn } from "./components/columns";
import {format} from "date-fns"
import { formatter } from "@/lib/utils";
export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await db.product.findMany({
    where:{
      storeId: params.storeId
    },
    include:{
      category:true
    },
    orderBy:{
      createAt:"desc"
    }
  })
  const formattedProducts:ProductColumn[] = products.map((item)=>({
    id:item.id,
    name:item.name,
    isFeatured:item.isFeatured,
    isArhived:item.isArchive,
    price:formatter.format(item.price.toNumber()),
    category:item.category.name,
    createdAt: format(item.createAt,"MMM do,yyyy"),
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
