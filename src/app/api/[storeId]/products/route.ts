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
    const { name,price,categoryId,images,isFeatured,isArchived } = body;

    if (!userId) {
      //jika user tidak ada
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

    const product = await db.product.create({
      data: {
        name,
        price,
        categoryId,
        isFeatured,
        isArchive: isArchived,
        storeId: params.storeId,
        images:{
          createMany:{
            data:[
              ...images.map((image:{url:string})=>image)
            ]
          }
        }
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT ERRRO", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const {searchParams} = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined;
    const isFeatured = searchParams.get("isFeatured")
    if (!params.storeId) {
      return new NextResponse("Store ID Harus Ada", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchive: false
      },
      include: {
        images: true,
        category: true,
      },
      orderBy:{
        createAt:"desc"
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("PRODUCT GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
