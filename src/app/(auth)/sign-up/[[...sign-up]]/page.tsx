import {  SignUp } from "@clerk/nextjs";

import React from 'react'

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp/>
    </div>
  )
}
