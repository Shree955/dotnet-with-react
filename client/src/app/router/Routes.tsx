import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/Activity/home/HomePage";
import ActivityDashboard from "../../features/Activity/Dashboard/ActivityDashboard";
import ActivityForm from "../../features/Activity/form/ActivityForm";
import ActivityDetailPage from "../../lib/types/ActivityDetailPage";
import Counter from "../../features/Activity/counter/Counter";
import TestErrors from "../../features/Activity/error/TestErrors";
import NotFound from "../../features/Activity/error/NotFound";
import ServerError from "../../features/Activity/error/ServerError";


export const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children:[
      {path:'', element:<HomePage/>},
      {path:'activities', element:<ActivityDashboard/>},
      {path:'activities/:id', element:<ActivityDetailPage/>},
      {path:'create-activity', element:<ActivityForm key='create'/>},
      {path:'manage/:id', element:<ActivityForm/>},
      {path:'counter', element:<Counter/>},
      {path:'errors', element:<TestErrors/>},
      {path:'not-found', element:<NotFound/>},
      {path:'server-error', element:<ServerError/>},
      {path:'*', element:<Navigate replace to='/not-found'/>}
    ]
  }
])