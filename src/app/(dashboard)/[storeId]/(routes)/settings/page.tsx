import db from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import SettingsForm from './components/settings-form'
interface SettingsPageProps{
    params:{
        storeId:string
    }
}
export default async function SettingsPage({params}:SettingsPageProps) {
    const user = await currentUser()
    const userId = user?.id
    if(!userId){
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
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SettingsForm initialData={store}/>
        </div>
    </div>
  )
}
