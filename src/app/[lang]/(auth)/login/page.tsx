import React from 'react'
import LoginForm from '@/modules/login-form'
import { getDictionary } from '../../dictionaries';

const Login = async ({params}:any) => {
  const t = await getDictionary(params.lang);

  return (
    <>
    <LoginForm t={t?.login}/>
    </>
  )
}
export default Login