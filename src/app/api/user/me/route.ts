import { NextResponse } from "next/server";
import { headers } from "next/headers";
import * as jose from "jose";
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const headerInstance = headers();
  const bearerToken = headerInstance.get("Authorization") as string

  const token = bearerToken.split(" ")[1];

  const payload = jwt.decode(token) as {email: string}
  const user = await prisma.user.findUnique({
    where:{
      email: payload.email
    },
    select:{
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone_no: true
    }
  })
  return NextResponse.json({
    id: user?.id,
    firstName: user?.first_name,
    lasttName: user?.last_name,
    email: user?.email,
    city: user?.city,
    phoneNum: user?.phone_no,
   });
}
