import React from "react";
import ReactDOM from "react-dom/client";
import {   createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import ContentLayout from "./components/ContentLayout";
import "./index.css";
import Index from "./components/pages/Index";
import { QueryClient, QueryClientProvider } from "react-query";
import PaddockLectures from "./components/pages/PaddockLectures";
import ProtectedRoute from "./components/ProtectedRoute";
import PiezoReports from "./components/pages/PiezoReports";
import IncidentReports from "./components/pages/IncidentReports";
import NewPiezoReport from "./components/pages/NewPiezoReport";
import NewIncidentReport from "./components/pages/NewIncidentReport";
import PiezoReportDetails from "./components/pages/PiezoReportDetails";
import IncidentReportDetails from "./components/pages/IncidentReportDetails";
import Login from "./components/pages/Login";
import ProtectedLogIn from "./components/ProtectedLogIn";
import BianualVisit from "./components/pages/BianualVisit";
import VisitDetails from "./components/pages/VisitDetails";
import MediaPlayer from "./components/MediaPlayer";

import PageLayout from "./components/pages/PageLayout";


const router = createBrowserRouter([
  {
    path: "/",

    element:<PageLayout/>,

    children:[
      {
        path:"",
        element:<Index/>
      },

      {
        path:"piezometer-lectures",
        element: <PaddockLectures/>
      },

      {
        path: "reports",
        children:[
          {
          path:"piezometers",  
          children: [
            {
              path:"",
              element:
                <PiezoReports />
              
            },
            {
              path:"new-report",
              element:
                <NewPiezoReport />
              
            },
            {
              path:":id",
              element:
                  <PiezoReportDetails />
               
            }
          ]
        },
        {
          path:"incidents",  
          children: [
            {
              path:"",
              element:
                     <IncidentReports  />
                   
            },
            {
              path:"new-incident",
              element:
              <NewIncidentReport />
            
            },
            {
              path:":id",
              element:
              <IncidentReportDetails />
            
            }
          ]
        }]
      },
    ]
  },
  

  {
    path: "/login",
    element: 
    // <ProtectedLogIn>
      <Login />
              
    // </ProtectedLogIn>
    
  },

  {
    path: "/biannual-visits",
    element: 
    // <ProtectedRoute>
                
                  <BianualVisit />
                
              // </ProtectedRoute>
    
  },

  {
    path: "/biannual-visits/:id",
    element: 
    // <ProtectedRoute>
                
                <VisitDetails />
                
              // </ProtectedRoute>
    
  },

  // {
  //   path: "/biannual-visits/media",
  //   element: 
  //   // <ProtectedRoute>
  //               <MediaPlayer />
  //             // </ProtectedRoute>
    
  // },

  
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
    </QueryClientProvider>
    
  </React.StrictMode>
);
