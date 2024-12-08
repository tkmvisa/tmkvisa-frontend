import React from 'react'

const Label = ({children, notMandatory}:any) => {
  return (
    <>
    <label htmlFor="" className="text-sm font-medium font_man">
        {children}
        {
            !notMandatory && <sup className="text-danger">*</sup>
        }
    </label>
    </>
  )
}

export default Label