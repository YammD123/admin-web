import db from '@/lib/db'
import React from 'react'

export default async function BannerPage({
    params
}:{
    params:{bannerId:string}
}) {
    const banner = await db.banner.findUnique({
        where:{
            id:params.bannerId
        }
    })
  return (
    <div className=''>
        
    </div>
  )
}
