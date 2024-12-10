import React from 'react'
import ApplicationTable from "../../../../components/application-table/application-table"
import axios from 'axios';


async function fetchApplication(){
  const application = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications?populate[0]=users_permissions_user`)
  return application?.data
}

const Dashboard = async () => {
  const application = await fetchApplication()
  return (
    <>
      <ApplicationTable applicationsListProps={application}/>
    </>
  )
}

export default Dashboard