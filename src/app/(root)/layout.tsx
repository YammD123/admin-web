import db from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function SetupLayout({
    children,}:{
        children: React.ReactNode
    }) {
        const user = await currentUser()
        const userId = user?.id
        if(!userId){
            redirect('/sign-in')
        }

        const store = await db.store.findFirst({
            where:{
                userId
            }
        })
        if(store){
            redirect(`/${store.id}`)
        }
  return (
    <>{children}</>
  )
}
