import React from 'react'
import EditApplicationModule from "@/modules/edit-module"
import axios from 'axios'

const getDocumant = async (id) => {
    const { edit } = id
    const documentRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications/${edit[1]}`)
    return documentRes
}

const EditApplication = async ({ params }) => {
    const documentRes = await getDocumant(params)
    return (
        <>
            <EditApplicationModule documentRes={documentRes.data.data}/>
        </>
    )
}

export default EditApplication