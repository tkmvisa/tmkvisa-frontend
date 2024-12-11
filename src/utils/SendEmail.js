export const SendEmail = async ({res, showToast, status}) => {
    var endpoint;
    switch (status) {
        case "invitation":
            endpoint = "send-mail-invitation-received"
            break;
        case "new":
            endpoint = "send-mail-create-application"
            break;
        
        case "update":
            endpoint = "send-mail-status-update"
            break;
        default:
            endpoint = "send-mail-status-update"
            break;
    }
    const rawResponse = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(res)
    });
    const email = await rawResponse.json();
    if (email.status === 'ok') {
        showToast("Email Sended To User", "success");
    }
}