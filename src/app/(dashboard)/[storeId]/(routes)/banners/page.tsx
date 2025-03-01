import React from 'react'
import { BannnerClient } from './components/clientBanner'

export default function BannerPage() {
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BannnerClient/>
      </div>
    </div>
  )
}
