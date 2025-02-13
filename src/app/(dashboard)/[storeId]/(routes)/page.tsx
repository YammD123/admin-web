import db from "@/lib/db";
import React from "react";

export default async function DashboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const store = await db.store.findFirst({
    where:{
      id: params.storeId
    }
  })
  return (
  <div>
    actiie store = {store?.name}
  </div>
)
}
