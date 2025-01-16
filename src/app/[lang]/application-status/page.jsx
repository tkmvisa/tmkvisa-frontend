import Head from "next/head";
import { getDictionary } from "../dictionaries";
import ApplicationStatusPage from "./application-status"

const ApplicationStatus = async ({ params }) => {
    const t = await getDictionary(params.lang);
    return (
        <>
            <Head>
                <script
                    src="https://cdn.pulse.is/livechat/loader.js"
                    data-live-chat-id="67878b0cd57e09b8ab06a598"
                    async
                ></script>
            </Head>
            <ApplicationStatusPage t={t?.application_status_page} />
        </>
    )
}

export default ApplicationStatus