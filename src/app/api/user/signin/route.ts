import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

interface ISignin {
  email: string;
  password: string;
}
const prisma = new PrismaClient();
export async function POST(request: Request) {
  const req: ISignin = await request.json();
  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isEmail(req.email),
      errorMsg: "Email is invalid",
    },
    {
      valid: validator.isLength(req.password, { min: 5 }),
      errorMsg: "Password is invalid",
    },
  ];
  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMsg);
    }
  });
  if (errors.length) {
    return new NextResponse(JSON.stringify({
      errorMsg: errors[0]
  }),{status: 401})
  }
  const userData = await prisma.user.findUnique({
    where: {
      email: req.email,
    },
  });
  if (!userData) {
    return new NextResponse(JSON.stringify({
      errorMsg: "User not found"
  }),{status: 401})
  }
  const isMatch = bcrypt.compare(req.password, userData.password);
  if (!isMatch) {
    return new NextResponse(JSON.stringify({
      errorMsg: "Password is invalid"
  }),{status: 401})
  }

  const alg = "HS256";
  const signature = new TextEncoder().encode(process.env.JWT_SECRECT);
  const token = await new jose.SignJWT({ email: req.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("2days")
    .sign(signature);

    const setCookies =  NextResponse.json({ 
      id: userData.id,
      firstName: userData.first_name,
      lasttName: userData.last_name,
      email: userData.email,
      city: userData.city,
      phoneNum: userData.phone_no,
     }, {status: 200});
     
    setCookies.cookies.set({
      name: "jwt",
      value: token,
      maxAge: 60 * 60 * 24 * 2
    })
  return setCookies;
}
