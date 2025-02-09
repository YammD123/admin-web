'use client'

import Modal from "@/components/modal";
import { UserButton } from "@clerk/nextjs";
import { useStoreModal } from "./hooks/use-store-modal";
import { useEffect } from "react";

export default function setUpPage () {
    // const onOpen = useStoreModal((state)=>state.onOpen)
    // const isOpen = useStoreModal((state)=>state.isOpen)
    
    // useEffect(()=>{
    //     if(!isOpen){
    //         onOpen()
    //     }
    // },[isOpen,onOpen])
  return (
    <div className="p-2">
       <UserButton/>
    </div>
  )
}
