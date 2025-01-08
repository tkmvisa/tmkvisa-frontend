import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// all categories
export async function POST(req) {
    const { ApplicationID, firstName, lastName, Email_Lang, email, file } = await req.json()
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
            template = `<p><strong>Vize Davetiyeniz Alındı</strong></p><br>
<p style={{textTransform: "capitalize" }}>Sayın ${firstName} ${lastName},</p>
<p>Vize başvurunuzla ilgili bir davetiyenin düzenlendiğini size bildirmekten memnuniyet duyarız. Bu, başvurunuzun işlenmesinde önemli bir adımdır. Davetiye mektubunuzu aşağıda bulabilirsiniz.</p>
<p>TKMVISA'ya olan güveniniz için teşekkür ederiz. Sürecin geri kalanında size destek olmaktan memnuniyet duyacağız.</p>
<p><strong>Saygılarımızla,</strong></p>
<p>TKMVISA Ekibi</p>
<table width="100%" align="center" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="30px">
                                <a href='${file}' target="_blank" style="display:flex; display:inline-block align-items: center; gap: 4px">
                                    <img 
                                        src="https://res.cloudinary.com/dsqenr8sl/image/upload/v1736367594/File_Format_Icons_1_0_36b64a3af5.png?updatedAt=2025-01-08T20%3A19%3A54.677Z" 
                                    />
                                </a>
                            </td>
                            <td>
                                <span style="padding-top:10px;"><a href='${file}' target="_blank" style="text-decoration: none; color:black">Invitation Letter</a></span>
                            </td>
                        </tr>
                    </table>
`

            break;
        case "russian":
            template = ` <p><strong>Ваше приглашение на визу получено</strong></p><br>
<p style={{textTransform: "capitalize" }}>Уважаемый(ая) ${firstName} ${lastName},</p>
<p>Мы рады сообщить вам, что было выдано приглашение, связанное с вашей визовой заявкой. Это важный шаг в обработке вашей заявки. Вы можете найти ваше письмо-приглашение ниже.</p>
<p>Спасибо за ваше доверие к TKMVISA. Мы с нетерпением ждем возможности поддержать вас на протяжении всего оставшегося процесса.</p>
<p><strong>С уважением,</strong></p>
<p>Команда TKMVISA</p>
<table width="100%" align="center" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="30px">
                                <a href='${file}' target="_blank" style="display:flex; display:inline-block align-items: center; gap: 4px">
                                    <img 
                                        src="https://res.cloudinary.com/dsqenr8sl/image/upload/v1736367594/File_Format_Icons_1_0_36b64a3af5.png?updatedAt=2025-01-08T20%3A19%3A54.677Z" 
                                    />
                                </a>
                            </td>
                            <td>
                                <span style="padding-top:10px;"><a href='${file}' target="_blank" style="text-decoration: none; color:black">Invitation Letter</a></span>
                            </td>
                        </tr>
                    </table>
`
            break;
        default:
            template = `<p><Strong>Your Visa Invitation Received</Strong></p><br>
                    <p style={{textTransform: "capitalize" }}>Dear ${firstName} ${lastName},</p>
                    <p>We are pleased to inform you that an invitation related to your visa application has been issued. This is an important step in the processing of your application. You can find your invitation letter below.
                    <p>Thank you for your continued trust in TKMVISA. We look forward to supporting you throughout the rest of the process.</p>
                    <p><strong>Best regards,</strong></p>
                    <p>TKMVISA Team</p>
                    <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="30px">
                                <a href='${file}' target="_blank" style="display:flex; display:inline-block align-items: center; gap: 4px">
                                    <img 
                                        src="https://res.cloudinary.com/dsqenr8sl/image/upload/v1736367594/File_Format_Icons_1_0_36b64a3af5.png?updatedAt=2025-01-08T20%3A19%3A54.677Z" 
                                    />
                                </a>
                            </td>
                            <td>
                                <span style="padding-top:10px;"><a href='${file}' target="_blank" style="text-decoration: none; color:black">Invitation Letter</a></span>
                            </td>
                        </tr>
                    </table>
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