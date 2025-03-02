"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Banner } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { BannerColumn, columns } from "./columns"
import { DataTable } from "@/components/data-table"

interface BannerClientProps {
    data:BannerColumn[]
}


export const BannnerClient : React.FC<BannerClientProps>= ({data})=>{
    const router = useRouter()
    const params = useParams()
    return (
    <>
        <div className="flex items-center justify-between">
            <Heading
             title={`Banners (${data.length})`}
             description="Manage Banners for your store"
             />
             <Button onClick={()=>router.push(`/${params.storeId}/banners/new`)}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New
             </Button>
        </div>
             <Separator/>
             <DataTable data={data} searchKey="label" columns={columns}/>
    </>
    )
}