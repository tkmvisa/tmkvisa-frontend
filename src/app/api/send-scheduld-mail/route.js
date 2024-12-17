import axios from "axios";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL

export async function GET(req) {
    
    const res = await axios.get(`${BASE_URL}/api/applications?populate[0]=users_permissions_user`)
    const application = res?.data?.data || []

    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.NEXT_PUBLIC_APP_PASSWORD_FOR_EMAIL,
        },
    });

    function choseEmailTemplate(data) {
        let template

        switch (data?.Email_Lang) {
            case "turkmen":
                template = `<p><strong>Vize Başvurunuz Oluşturuldu</strong></p><br>
                            <p style={{textTransform: "capitalize" }}>Sayın ${data?.firstName} ${data?.lastName},</p>
                            <p>Vize başvurunuzun şu anda işlem aşamasında olduğunu bildirmek isteriz. 
                            Başvurunuzu incelemekteyiz ve herhangi bir güncelleme olduğunda sizi en kısa sürede bilgilendireceğiz.
                            Bu arada, başvurunuzun durumunu her zaman aşağıdaki bağlantıyı ziyaret ederek ve başvuru numaranızı girerek kontrol edebilirsiniz: <strong>${data?.ApplicationID}</strong></p><br/>
                            <a href="https://tkmvisa.com/en/application-status?applicationId=${data?.ApplicationID}">tkmvisa.com/status</a><br/><br/>
                            <p>Sabrınız için teşekkür ederiz.</p>
                            <p>Herhangi bir sorunuz varsa veya ek yardım almak isterseniz, lütfen bizimle iletişime geçmekten çekinmeyin.</p>
                            <p><strong>Saygılarımızla,</strong></p>
                            <p>TKMVISA Ekibi</p>`
                break;
            case "russian":
                template = ` <p><strong>Ваша виза заявка создана</strong></p><br>
                            <p style={{textTransform: "capitalize" }}>Уважаемый(ая) ${data?.firstName} ${data?.lastName},</p>
                            <p>Мы хотели бы сообщить вам, что ваша виза заявка в настоящее время находится в процессе обработки. 
                            Мы рассматриваем вашу заявку и уведомим вас о любых обновлениях как можно скорее.
                            Тем временем, вы можете проверить статус вашей заявки в любое время, посетив следующую ссылку и введя ваш номер заявки: <strong>${data?.ApplicationID}</strong></p><br/>
                            <a href="https://tkmvisa.com/en/application-status?applicationId=${data?.ApplicationID}">tkmvisa.com/status</a><br/><br/>
                            <p>Спасибо за ваше терпение.</p>
                            <p>Если у вас возникнут вопросы или вам потребуется дополнительная помощь, пожалуйста, не стесняйтесь обратиться к нам.</p>
                            <p><strong>С уважением,</strong></p>
                            <p>Команда TKMVISA</p>
                `
                break;
            default:
                template = `<p><Strong>Your Visa Application Created</Strong></p><br>
                        <p style={{textTransform: "capitalize" }}>Dear ${data?.firstName} ${data?.lastName},</p>
                        <p>We would like to inform you that your visa application is currently in process. 
                        We are reviewing your application and will notify you of any updates as soon as possible.
                        In the meantime, you can check the status of your application at any time by 
                        visiting the following link and entering your application number: <strong>${data?.ApplicationID}</strong></p><br/>
                        <a href="https://tkmvisa.com/en/application-status?applicationId=${data?.ApplicationID}">tkmvisa.com/status</a><br/><br/>
                        <p>Thank you for your patience. </p>
                        <p>If you have any questions or need further assistance, please do not hesitate to reach out.</p>
                        <p><strong>Best regards,</strong></p>
                        <p>TKMVISA Team</p>
                    `
                break;
        }

        return template

    }


    try {
        
        cron.schedule('*/30 * * * * *', async () => {
            await Promise.all(
                application?.map(async (item) => {
                    transporter.sendMail({
                        from: process.env.NEXT_PUBLIC_EMAIL,
                        to: item.attributes.email,
                        subject: `Status Update`,
                        html: choseEmailTemplate(item?.attributes)
                    });
                })
            );
        })

        return new NextResponse(
            JSON.stringify({
                status: "ok",
                message: "Email send"
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