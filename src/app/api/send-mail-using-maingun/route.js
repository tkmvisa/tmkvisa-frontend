import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// all categories
export async function POST(req) {
    // const { ApplicationID, firstName, lastName, Email_Lang } = await req.json()
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 587,
        auth: {
          user: 'postmaster@sandboxbb52ac60c1354133ae5dcf71604d6f16.mailgun.org',
          pass: 'e36c9e83388f845a7b5a5dbe9db38b2c-da554c25-a4165ad0',
        },
      });

    try {
        await transporter.sendMail({
            from: '"Your Name" <postmaster@sandboxbb52ac60c1354133ae5dcf71604d6f16.mailgun.org>',
            to: "zunairgillani54@gmail.com",
            subject: `Application Created `,
            html: "dddd"
        });
        return new NextResponse(
            JSON.stringify({
                status: "ok",
                message: "Email send",
            }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}