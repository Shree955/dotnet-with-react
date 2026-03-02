import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/Activity/home/HomePage";
import ActivityDashboard from "../../features/Activity/Dashboard/ActivityDashboard";
import ActivityForm from "../../features/Activity/ActivityForm";
import ActivityDetail from "../../lib/types/ActivityDetail";

export const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children:[
      {path:'', element:<HomePage/>},
      {path:'activities', element:<ActivityDashboard/>},
      {path:'activities/:id', element:<ActivityDetail/>},
      {path:'create-activity', element:<ActivityForm key='create'/>},
      {path:'manage/:id', element:<ActivityForm/>}
    ]
  }
])