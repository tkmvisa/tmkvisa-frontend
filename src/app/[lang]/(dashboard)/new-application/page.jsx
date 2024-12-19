import React from 'react'
import NewApplicationPage from  "./new-application-page"
import { getDictionary } from '../../dictionaries';

const NewApplication = async({params}) => {
const t = await getDictionary(params.lang);
  return (
    <>
        <NewApplicationPage t={t?.new_application}/>
    </>
  )
}

export default NewApplication