
import { addProduct } from "@/lib/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Basic validation
    if (!body.name || !body.price) {
        return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const docRef = await addProduct(body);
    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error: any) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: error.message || "Failed to add product" }, { status: 500 });
  }
}
