import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// all categories
export async function POST(req) {
    const { ApplicationID, firstName, lastName, Email_Lang, email } = await req.json()
    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.APP_PASSWORD_FOR_EMAIL,
        },
    });

    let template;

    switch (Email_Lang) {
        case "turkmen":
            template = `<p><strong>Vize Başvurunuz İçin Randevu</strong></p><br>
                        <p style={{ textTransform: "capitalize" }}>Sayın ${firstName} ${lastName},</p>
                        <p>Vize başvurunuzla ilgili bir randevu planlandığını bildirmekten mutluluk duyarız. Bu, başvurunuzun işlenmesi sürecinde önemli bir adımdır.</p><br/>
                        <p>TKMVISA'ya olan güveniniz için teşekkür ederiz. Sürecin geri kalanında size destek olmaktan memnuniyet duyacağız.</p>
                        <p><strong>Saygılarımızla,</strong></p>
                        <p>TKMVISA Ekibi</p>
                        `
            break;
        case "russian":
            template = ` <p><strong>Запись на подачу заявления на визу</strong></p><br>
                        <p style={{ textTransform: "capitalize" }}>Уважаемый(ая) ${firstName} ${lastName},</p>
                        <p>Мы рады сообщить вам, что назначена встреча, связанная с вашим заявлением на визу. Это важный этап в процессе обработки вашего заявления.</p><br/>
                        <p>Благодарим вас за ваше доверие к TKMVISA. Мы готовы поддерживать вас на всех последующих этапах процесса.</p>
                        <p><strong>С наилучшими пожеланиями,</strong></p>
                        <p>Команда TKMVISA</p>
            `
            break;
        default:
            template = `<p><Strong>Appointment for Your Visa Application</Strong></p><br>
                    <p style={{textTransform: "capitalize" }}>Dear ${firstName} ${lastName},</p>
                    <p>We are pleased to inform you that an appointment related to your visa application has been scheduled. This is an important step in the processing of your application.</p><br/>
                    <p>Thank you for your continued trust in TKMVISA. We look forward to supporting you throughout the rest of the process.</p>
                    <p><strong>Best regards,</strong></p>
                    <p>TKMVISA Team</p>
                `
            break;
    }


    try {
        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: `${email}`,
            subject: `Status Update`,
            html: template
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