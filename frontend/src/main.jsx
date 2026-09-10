
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes/AppRoute'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  <RouterProvider  router={routes}/>
)
