import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
    try {
        
        const user = await currentUser()
        const userId = user?.id
        const body = await req.json()
        const { name } = body;
        if(!userId){
            return new NextResponse("Unauthorizid", { status: 401 });
        }
        if(!name){
            return new NextResponse("Nama Harus Ada ", { status: 400 });
        }

        if(!params.storeId){
            return new NextResponse("Store ID Harus Ada", { status: 400 });
        }

        const store = await db.store.update({
            where:{
                id:params.storeId,
                userId:userId
            },
            data:{
                name:name
            }
        })
        return NextResponse.json(store);
    } catch (error) {
        console.log("STORE ERRRO", error);
        return new NextResponse("Internal Error", { status: 500 }); 
    }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
    try {
        
        const user = await currentUser()
        const userId = user?.id
        if(!userId){
            return new NextResponse("Unauthorizid", { status: 401 });
        }


        if(!params.storeId){
            return new NextResponse("Store ID Harus Ada", { status: 400 });
        }

        const store = await db.store.deleteMany({
            where:{
                id:params.storeId,
                userId:userId
            },

        })
        return NextResponse.json(store);
    } catch (error) {
        console.log("STORE DELETE", error);
        return new NextResponse("Internal Error", { status: 500 }); 
    }
}
