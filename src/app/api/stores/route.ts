import db from "@/lib/db";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser(); //mengambil auth dari clerk
    const userId = user?.id;
    const body = await req.json(); //mengambil data dari body
    const { name } = body;

    if (!userId) { //jika user tidak ada
      return new NextResponse("Unauthorizid", { status: 401 });
    }
    if (!name) { //selain dari name berarti harus ada
      return new NextResponse("Nama Harus Ada ", { status: 400 });
    }

    const store = await db.store.create({ //membuat store dengan name dan userId
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE ERRRO", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
