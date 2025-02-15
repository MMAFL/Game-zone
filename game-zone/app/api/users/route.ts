import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Helper function to verify JWT
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "") as { userId: number };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

// ✅ Get Current User
export async function GET(request: NextRequest) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { id: decodedToken.userId },
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        age: true,
        address: true,
        sexe: true,
        role: true,
  
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Error fetching user" },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { first_name, last_name, age, address } = await request.json();

    const updatedUser = await prisma.users.update({
      where: { id: decodedToken.userId },
      data: { first_name, last_name, age: Number(age), address },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}