import db from "@/lib/db";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const user = await currentUser(); //mengambil auth dari clerk
    const userId = user?.id;
    const body = await req.json(); //mengambil data dari body
    const { label, imageURL } = body;

    if (!userId) {
      //jika user tidak ada
      return new NextResponse("Unauthorizid", { status: 401 });
    }
    if (!label) {
      //selain dari label berarti harus ada
      return new NextResponse("label Harus Ada ", { status: 400 });
    }
    if (!imageURL) {
      //selain dari label berarti harus ada
      return new NextResponse("ImageUrl Harus Ada ", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store ID Harus Ada", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeByUserId) {
      return NextResponse.json({ message: "Store Not Found" }, { status: 404 });
    }

    const banners = await db.banner.create({
      data: {
        label,
        imageURL,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(banners);
  } catch (error) {
    console.log("BANNERS ERRRO", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID Harus Ada", { status: 400 });
    }

    const banners = await db.banner.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(banners);
  } catch (error) {
    console.log("BANNERS GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
