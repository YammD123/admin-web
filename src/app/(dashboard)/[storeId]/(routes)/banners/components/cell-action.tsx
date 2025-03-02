"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BannerColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps {
    data:BannerColumn
}


export const CellAction : React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)

    const onCopy = (Copy:string)=>{
        navigator.clipboard.writeText(Copy)
        toast.success('copied')
    }

    const onDelete = async ()=>{
        try {
          setLoading(true)
          await axios.delete(`/api/${params.storeId}/banners/${data.id}`)
          router.push(`/${params.storeId}/banners`)
          toast.success("berhasil menghapus data")
          router.refresh()
        } catch (error) {
          toast.error("gagal menghapus data")
        }finally{
          setLoading(false)
          setOpen(false)
        }
      }
    return(
        <>
        <AlertModal 
        isOpen={open} 
        onClose={()=>setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
         />
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"}>
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="w-4 h-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" >
                    <DropdownMenuLabel>
                        Action
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4"/>
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/banners/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4"/>
                        Edit 
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4"/>
                        Delete 
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </>
    )
}