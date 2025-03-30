import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function GET(request: Request) {
  const allMaterials = await prisma.material.findMany();
  return NextResponse.json(allMaterials);
}
