
import { useEffect, useState } from "react"

export const useorigin = ()=>{
    const [mounted,setMounted]=useState(false)
    const orign = typeof window !== "undefined" && window.location.origin? window.location.origin : ''
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted){
        return null
    }
    return orign
}