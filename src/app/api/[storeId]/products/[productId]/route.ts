import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: { storeId: string, productId: string } }
  ) {
    try {

      if (!params.productId) {
        return new NextResponse("Product ID Harus Ada", { status: 400 });
      }
  

      const product = await db.product.findUnique({
        where: {
          id: params.productId
        },
        include: {
          images: true,
          category: true,
        },
      });
      return NextResponse.json(product);
    } catch (error) {
      console.log("PRODUCT GET ID", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const body = await req.json();
    const { name,price,categoryId,images,isFeatured,isArchived } = body;
    if (!userId) {
      return new NextResponse("Unauthorizid", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name Harus Ada ", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price Harus Ada ", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("iamage Harus Ada ", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Harus Ada ", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID Harus Ada", { status: 400 });
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

  await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        isFeatured,
        isArchive: isArchived,
        images: {
          deleteMany: {},
        }
      },
    });

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data:{
        images: {
          createMany:{
            data:[
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
      }
    })
    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT ERRRO", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string, productId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return new NextResponse("Unauthorizid", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID Harus Ada", { status: 400 });
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

    const product = await db.product.deleteMany({
      where: {
        id: params.productId
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
