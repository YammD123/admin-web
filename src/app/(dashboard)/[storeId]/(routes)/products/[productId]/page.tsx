import db from '@/lib/db'
import React from 'react'
import ProductForm from './components/product-form'

export default async function ProductPage({
    params
}:{
    params:{productId:string, storeId:string}
}) {
    const product = await db.product.findUnique({
        where:{
            id:params.productId
        },
        include:{
            images:true
        }
    })
    const categories = await db.category.findMany({
        where:{
            storeId:params.storeId
        }
    })
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ProductForm categories={categories} initialData={product}/>
        </div>
    </div>
  )
}
