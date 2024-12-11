import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// all categories
export async function POST(req) {
    const { ApplicationID, firstName, lastName, Email_Lang } = await req.json()
    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.NEXT_PUBLIC_APP_PASSWORD_FOR_EMAIL,
        },
    });

    let template;

    switch (Email_Lang) {
        case "turkmen":
            template = `<p><strong>Vize Başvurunuz Oluşturuldu</strong></p><br>
                        <p style={{ textTransform: "capitalize" }}>Sayın ${firstName} ${lastName},</p>
                        <p>Vize başvurunuzla ilgili bir davetiyenin yayımlandığını bildirmekten memnuniyet duyuyoruz. Bu, başvurunuzun işleme alınmasında önemli bir adımdır. 
                        Lütfen davetiyenin detaylarını dikkatlice inceleyin ve gerekli tüm adımları zamanında tamamladığınızdan emin olun. Ek yardım veya açıklamaya ihtiyaç duyarsanız, bizimle iletişime geçmekten çekinmeyin.</p><br/>
                        <p>TKMVISA'ya duyduğunuz güven için teşekkür ederiz. Sürecin geri kalanında size destek olmaktan mutluluk duyacağız.</p>
                        <p><strong>Saygılarımızla,</strong></p>
                        <p>TKMVISA Ekibi</p>`
            break;
        case "russian":
            template = ` <p><strong>Ваше заявление на визу создано</strong></p><br>
                        <p style={{ textTransform: "capitalize" }}>Уважаемый(ая) ${firstName} ${lastName},</p>
                        <p>Мы рады сообщить вам, что было выдано приглашение, связанное с вашим заявлением на визу. Это важный шаг в процессе рассмотрения вашего заявления. 
                        Пожалуйста, внимательно ознакомьтесь с деталями приглашения и убедитесь, что все необходимые действия выполнены своевременно. Если вам потребуется дополнительная помощь или уточнение, не стесняйтесь обращаться к нам.</p><br/>
                        <p>Благодарим вас за ваше доверие к TKMVISA. Мы с нетерпением ждем возможности поддерживать вас на протяжении всего процесса.</p>
                        <p><strong>С уважением,</strong></p>
                        <p>Команда TKMVISA</p>
            `
            break;
        default:
            template = `<p><Strong>Your Visa Application Created</Strong></p><br>
                    <p style={{textTransform: "capitalize" }}>Dear ${firstName} ${lastName},</p>
                    <p>We are pleased to inform you that an invitation related to your visa application has been issued. This is an important step in the processing of your application.
                    Please review the details of the invitation carefully and ensure that all necessary actions are completed promptly. Should you need any further assistance or clarification, feel free to reach out to us.</p><br/>
                    <p>Thank you for your continued trust in TKMVISA. We look forward to supporting you throughout the rest of the process.</p>
                    <p><strong>Best regards,</strong></p>
                    <p>TKMVISA Team</p>
                `
            break;
    }


    try {
        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: "zunairgillani54@gmail.com",
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