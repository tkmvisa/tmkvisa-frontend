import React from 'react'
import ApplicationTable from "../../../../components/application-table/application-table"
import axios from 'axios';
import { getDictionary } from '../../dictionaries';


async function fetchApplication(){
  const application = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications?populate[0]=users_permissions_user`)
  return application?.data
}

const Dashboard = async ({params}) => {
  const application = await fetchApplication()

  const t = await getDictionary(params.lang);

  return (
    <>
      <ApplicationTable applicationsListProps={application} t={t?.dashboard}/>
    </>
  )
}

export default Dashboard