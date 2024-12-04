"use client"
import { Provider } from 'react-redux'
import { store } from './store'

const ThemeProvider = ({children}:any) => {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default ThemeProvider