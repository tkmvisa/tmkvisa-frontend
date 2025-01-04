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
            template = `<p><strong>Vize davetiyeniz alındı</strong></p><br />
<p style={{ textTransform: "capitalize" }}>Sayın ${firstName} ${lastName},</p>
<p>Vize başvurunuzla ilgili bir davetiyenin oluşturulduğunu size bildirmekten memnuniyet duyuyoruz. Bu, başvurunuzun işlenmesi sürecinde önemli bir adımdır.</p>
<p>TKMVISA'ya olan güveniniz için teşekkür ederiz. Sürecin geri kalanında size destek olmaktan mutluluk duyacağız.</p>
<p><strong>Saygılarımızla,</strong></p>
<p>TKMVISA Ekibi</p>
`
            break;
        case "russian":
            template = ` <p><strong>Ваше приглашение на визу получено</strong></p><br />
<p style={{ textTransform: "capitalize" }}>Уважаемый ${firstName} ${lastName},</p>
<p>Мы рады сообщить вам, что приглашение, связанное с вашей заявкой на визу, было выдано. Это важный шаг в процессе обработки вашей заявки.</p>
<p>Благодарим вас за доверие к TKMVISA. Мы будем рады поддерживать вас на всех этапах процесса.</p>
<p><strong>С уважением,</strong></p>
<p>Команда TKMVISA</p>

            `
            break;
        default:
            template = `<p><Strong>Your Visa Invitation Received</Strong></p><br>
                    <p style={{textTransform: "capitalize" }}>Dear ${firstName} ${lastName},</p>
                    <p>We are pleased to inform you that an invitation related to your visa application has been issued. This is an important step in the processing of your application.
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
            subject: `Invitation for Your Visa Application`,
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