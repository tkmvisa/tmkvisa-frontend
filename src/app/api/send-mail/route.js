import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// all categories
export async function POST(req) {
    const { ApplicationID="weqweqweqweqwe", firstName="turkmen", lastName="turkmen", Email_Lang="turkmen" } = await req.json()
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
                        <p style={{textTransform: "capitalize" }}>Sayın ${firstName} ${lastName},</p>
                        <p>Vize başvurunuzun şu anda işlem aşamasında olduğunu bildirmek isteriz. 
                        Başvurunuzu incelemekteyiz ve herhangi bir güncelleme olduğunda sizi en kısa sürede bilgilendireceğiz.
                        Bu arada, başvurunuzun durumunu her zaman aşağıdaki bağlantıyı ziyaret ederek ve başvuru numaranızı girerek kontrol edebilirsiniz: <strong>${ApplicationID}</strong></p><br/>
                        <a href="https://tkmvisa.com/en/application-status?applicationId=${ApplicationID}">tkmvisa.com/status</a><br/><br/>
                        <p>Sabrınız için teşekkür ederiz.</p>
                        <p>Herhangi bir sorunuz varsa veya ek yardım almak isterseniz, lütfen bizimle iletişime geçmekten çekinmeyin.</p>
                        <p><strong>Saygılarımızla,</strong></p>
                        <p>TKMVISA Ekibi</p>`
            break;
        case "russian":
            template = ` <p><strong>Ваша виза заявка создана</strong></p><br>
                        <p style={{textTransform: "capitalize" }}>Уважаемый(ая) ${firstName} ${lastName},</p>
                        <p>Мы хотели бы сообщить вам, что ваша виза заявка в настоящее время находится в процессе обработки. 
                        Мы рассматриваем вашу заявку и уведомим вас о любых обновлениях как можно скорее.
                        Тем временем, вы можете проверить статус вашей заявки в любое время, посетив следующую ссылку и введя ваш номер заявки: <strong>${ApplicationID}</strong></p><br/>
                        <a href="https://tkmvisa.com/en/application-status?applicationId=${ApplicationID}">tkmvisa.com/status</a><br/><br/>
                        <p>Спасибо за ваше терпение.</p>
                        <p>Если у вас возникнут вопросы или вам потребуется дополнительная помощь, пожалуйста, не стесняйтесь обратиться к нам.</p>
                        <p><strong>С уважением,</strong></p>
                        <p>Команда TKMVISA</p>
            `
            break;
        default:
            template = `<p><Strong>Your Visa Application Created</Strong></p><br>
                    <p style={{textTransform: "capitalize" }}>Dear ${firstName} ${lastName},</p>
                    <p>We would like to inform you that your visa application is currently in process. 
                    We are reviewing your application and will notify you of any updates as soon as possible.
                    In the meantime, you can check the status of your application at any time by 
                    visiting the following link and entering your application number: <strong>${ApplicationID}</strong></p><br/>
                    <a href="https://tkmvisa.com/en/application-status?applicationId=${ApplicationID}">tkmvisa.com/status</a><br/><br/>
                    <p>Thank you for your patience. </p>
                    <p>If you have any questions or need further assistance, please do not hesitate to reach out.</p>
                    <p><strong>Best regards,</strong></p>
                    <p>TKMVISA Team</p>
                `
            break;
    }


    try {
        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: "zunairgillani54@gmail.com",
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