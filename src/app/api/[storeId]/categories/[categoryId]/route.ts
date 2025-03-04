import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: { categoryId: string, bannerId: string } }
  ) {
    try {

      if (!params.categoryId) {
        return new NextResponse("Category ID Harus Ada", { status: 400 });
      }
  

      const category = await db.category.findUnique({
        where: {
          id: params.categoryId
        },
      });
      return NextResponse.json(category);
    } catch (error) {
      console.log("CATEGORY GET ID", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const body = await req.json();
    const { name,bannerId } = body;
    if (!userId) {
      return new NextResponse("Unauthorizid", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name Harus Ada ", { status: 400 });
    }
    if (!bannerId) {
      return new NextResponse("Banner Id Harus Ada ", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID Harus Ada", { status: 400 });
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

    const category = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        bannerId,

      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY PATCH ERRRO", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return new NextResponse("Unauthorizid", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID Harus Ada", { status: 400 });
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

    const category = await db.category.deleteMany({
      where: {
        id: params.categoryId
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
