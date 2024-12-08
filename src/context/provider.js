"use client"
import React from 'react'
import SettingsProvider from './global-context'

const Provider = ({children}) => {
  return (
    <SettingsProvider>{children}</SettingsProvider>
  )
}

export default Provider