import { getDictionary } from "../dictionaries";
import ApplicationStatusPage from "./application-status"

const ApplicationStatus = async({params}) => {
    const t = await getDictionary(params.lang);
    return (
        <>
            <ApplicationStatusPage t={t?.application_status_page}/>
        </>
    )
}

export default ApplicationStatus