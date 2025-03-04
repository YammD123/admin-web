
import React from "react";
import { CategoryClient } from "./components/clientCategory";
import db from "@/lib/db";
import {format} from "date-fns"
import { CategoryColumn } from "./components/columns";
export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await db.category.findMany({
    where:{
      storeId: params.storeId
    },
    include:{
      banner:true
    },
    orderBy:{
      createAt:"desc"
    }
  })
  const formattedCategories:CategoryColumn[] = categories.map((item)=>({
    id:item.id,
    name:item.name,
    bannerLabel:item.banner.label,
    createdAt: format(item.createAt,"MMM do,yyyy"),
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
