import { UserButton } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'
import StoreSwicher from './store-swicher'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import db from '@/lib/db'

export default async function Navbar() {
  const user = await currentUser()
  const userId = user?.id

  if(!userId){
    redirect('/sign-in')
  }
  const stores = await db.store.findMany({
    where:{
      userId:userId
    }
  })
  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
            <StoreSwicher items={stores} />
            <MainNav className='mx-6'/>
            <div className='ml-auto flex items-center space-x-4'>
                <UserButton afterSignOutUrl='/'/>
            </div>
        </div>
    </div>
  )
}
