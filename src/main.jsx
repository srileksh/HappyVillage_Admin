import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './page/Login.jsx'
import HomePage from './page/HomePage.jsx'
import AuthLatout from './Layout/AuthLatout.jsx'
import MainLayout from './Layout/MainLayout.jsx'
import HouseDetails from './page/HouseDetails.jsx'
import BasicDetails from './page/BasicDetails.jsx'
import Members from './page/Members.jsx'
import WardDatas from './page/WardDatas.jsx'
import DemoReport from './page/DemoReport.jsx'
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path:'/',
    element:<AuthLatout/>,
    children:[
      {
        path:'/',
        element:<Login/>
      },

    ]
  },
  {
    
    element:<MainLayout/>,
    children:[
      {
        path:'home', element:<HomePage/>
      },
      {
        path:'ward', element:<WardDatas/>
      },
            {
        path:'house', element:<HouseDetails/>
      },
                  {
        path:'basic/:houseId', element:<BasicDetails/>
      },
      {
        path:'member/:personalId', element:<Members/>
      },
       {
        path:'demoReport', element:<DemoReport/>
      },


    ]
      
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <RouterProvider router={router}/>
  </StrictMode>,
)
