import React from "react";
import { BannnerClient } from "./components/clientBanner";
import db from "@/lib/db";
import { BannerColumn } from "./components/columns";
import {format} from "date-fns"
export default async function BannerPage({
  params,
}: {
  params: { storeId: string };
}) {
  const banners = await db.banner.findMany({
    where:{
      storeId: params.storeId
    },
    orderBy:{
      createAt:"desc"
    }
  })
  const formattedBanners:BannerColumn[] = banners.map((item)=>({
    id:item.id,
    label:item.label,
    createdAt: format(item.createAt,"MMM do,yyyy"),
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannnerClient data={formattedBanners} />
      </div>
    </div>
  );
}
