import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

interface IFormInput {
  firstName: string;
  lasttName: string;
  email: string;
  city: string;
  password: string;
  phoneNum: number;
}

export async function GET() {
  return NextResponse.json({ msg: "Hello" });
}

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const res: IFormInput = await request.json();
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(res.firstName, { min: 3 }),
      errorMsg: "First name is invalid",
    },
    {
      valid: validator.isLength(res.lasttName, { min: 3 }),
      errorMsg: "Last name is invalid",
    },
    {
      valid: validator.isEmail(res.email),
      errorMsg: "Email is invalid",
    },
    {
      valid: validator.isLength(res.city, { min: 3 }),
      errorMsg: "City is invalid",
    },
    {
      valid: validator.isMobilePhone(String(res.phoneNum)),
      errorMsg: "Phone is invalid",
    },
    {
      valid: validator.isLength(res.password, { min: 5 }),
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
  const existEmailCheck = await prisma.user.findUnique({
    where: {
      email: res.email,
    },
  });
  if (existEmailCheck) {
    return new NextResponse(JSON.stringify({
      errorMsg: "Email already exist"
  }),{status: 401})
  }
  const hashPassword = await bcrypt.hash(res.password, 10);
  const newUser = await prisma.user.create({
    data: {
      first_name: res.firstName,
      last_name: res.lasttName,
      email: res.email,
      city: res.city,
      phone_no: String(res.phoneNum),
      password: hashPassword,
    },
  });
  const alg = "HS256";
  const signature = new TextEncoder().encode(process.env.JWT_SECRECT);
  const token = await new jose.SignJWT({ email: res.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("2days")
    .sign(signature);

  return NextResponse.json({ newUser, token });
}
