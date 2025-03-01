import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: { storeId: string, bannerId: string } }
  ) {
    try {

      if (!params.bannerId) {
        return new NextResponse("Banner ID Harus Ada", { status: 400 });
      }
  

      const banner = await db.banner.findUnique({
        where: {
          id: params.bannerId
        },
      });
      return NextResponse.json(banner);
    } catch (error) {
      console.log("BANNER GET ID", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; bannerId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const body = await req.json();
    const { label, imageURL } = body;
    if (!userId) {
      return new NextResponse("Unauthorizid", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label Harus Ada ", { status: 400 });
    }
    if (!imageURL) {
      return new NextResponse("IamageUrl Harus Ada ", { status: 400 });
    }

    if (!params.bannerId) {
      return new NextResponse("Banner ID Harus Ada", { status: 400 });
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

    const banner = await db.banner.update({
      where: {
        id: params.bannerId,
      },
      data: {
        label: label,
        imageURL: imageURL,
      },
    });
    return NextResponse.json(banner);
  } catch (error) {
    console.log("BANNER ERRRO", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string, bannerId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return new NextResponse("Unauthorizid", { status: 401 });
    }

    if (!params.bannerId) {
      return new NextResponse("Banner ID Harus Ada", { status: 400 });
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

    const banner = await db.banner.deleteMany({
      where: {
        id: params.bannerId
      },
    });
    return NextResponse.json(banner);
  } catch (error) {
    console.log("BANNER DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
