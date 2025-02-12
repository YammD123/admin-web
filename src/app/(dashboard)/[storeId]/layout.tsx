import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
    const user = await currentUser()
    const userId = user?.id
    if (!userId){
        redirect('/sign-in')
    }
    const store = await db.store.findFirst({
        where:{
            id:params.storeId,
            userId:userId
        }
    })
    if(!store){
        redirect('/')
    }
    return (
        <>
        navbaer
        {children}
        </>
    )
}
