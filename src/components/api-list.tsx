"use client"


import { useorigin } from "@/app/hooks/use-origin"
import { useParams } from "next/navigation"
import { ApiAlert } from "./api-alert"

interface ApiListProps {
    namaIndikator: string
    indikator: string
}

export const ApiList : React.FC<ApiListProps> = ({
    namaIndikator,
    indikator
}) => {
    const params = useParams();
    const origin = useorigin()

    const baseUrl = `${origin}/api/${params.storeId}`
    return (
        <>
            <ApiAlert
            title="GET"
            variant="public"
            description={`${baseUrl}/${namaIndikator}`}
             />
            <ApiAlert
            title="GET"
            variant="public"
            description={`${baseUrl}/${namaIndikator}/${indikator}`}
             />
            <ApiAlert
            title="POST"
            variant="admin"
            description={`${baseUrl}/${namaIndikator}`}
             />
            <ApiAlert
            title="PATCH"
            variant="admin"
            description={`${baseUrl}/${namaIndikator}/${indikator}`}
             />
            <ApiAlert
            title="PATCH"
            variant="admin"
            description={`${baseUrl}/${namaIndikator}/${indikator}`}
             />
        </>
    )
}