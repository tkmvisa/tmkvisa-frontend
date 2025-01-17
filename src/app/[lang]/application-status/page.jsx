import { getDictionary } from "../dictionaries";
import ApplicationStatusPage from "./application-status"
import Script from 'next/script';

const ApplicationStatus = async ({ params }) => {
    const t = await getDictionary(params.lang);
    return (
        <>
            <Script
                src="https://cdn.pulse.is/livechat/loader.js"
                data-live-chat-id="678a10c04a1a7cf9240e7ecc"
                strategy="lazyOnload"
            />
            <ApplicationStatusPage t={t?.application_status_page} />
        </>
    )
}

export default ApplicationStatus