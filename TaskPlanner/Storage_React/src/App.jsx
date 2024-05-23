import { useState } from 'react'
import { routes } from './routes'
import { useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'



function App() {
  const element = useRoutes(routes)

  return (
    <>
    { element }
    <Toaster position="top-center" reserveOrder={false}/>
    </>
  )
}

export default App
