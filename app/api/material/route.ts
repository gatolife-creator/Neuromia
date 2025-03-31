import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { CardData } from "@/lib/interfaces";

export async function POST(request: Request) {
  try {
    const { id, title, description, tags, cards } = await request.json();

    if (!id || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new material with specified id
    await prisma.material.create({
      data: {
        id,
        title,
        description,
        tags,
      },
    });

    await prisma.card.createMany({
      data: cards.map((card: CardData) => ({
        ...card,
        due: new Date(card.due),
      })),
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error updating/creating material:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  console.log("Updating material...");
  try {
    const { id, title, description, tags, cards } = await request.json();
    if (!id || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Update material
    await prisma.material.update({
      where: { id },
      data: {
        title,
        description,
        tags,
      },
    });

    await prisma.card.deleteMany({
      where: { materialId: id },
    });
    await prisma.card.createMany({
      data: cards.map((card: CardData) => ({
        ...card,
        due: new Date(card.due),
      })),
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error updating material:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.card.deleteMany({
      where: { materialId: id },
    });

    // Delete material and its associated cards
    await prisma.material.delete({
      where: { id },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error deleting material:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
