import db from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import SettingsForm from './components/settings-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const user = await currentUser()
  const userId = user?.id

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId
    }
  })

  if (!store) {
    redirect('/')
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-center'>Store Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <SettingsForm initialData={store} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
