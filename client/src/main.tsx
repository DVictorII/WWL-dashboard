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

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    
    // <ProtectedRoute>
    <Index />
    //  </ProtectedRoute>,
  },

  {
    path: "/piezometer-lectures",
    element: 
    <ProtectedRoute>
    
      <PaddockLectures />
    </ProtectedRoute>,
  },

  {
    path: "/reports/piezometers",
    element: 
    <ProtectedRoute>
      <ContentLayout>
        <PiezoReports />
      </ContentLayout>
    </ProtectedRoute>
    
  },
  {
    path: "/reports/incidents",
    element: 
    <ProtectedRoute>
      <ContentLayout>
        <IncidentReports  />
      </ContentLayout>
    </ProtectedRoute>
    
  },

  {
    path: "/reports/piezometers/new-report",
    element: 
    <ProtectedRoute>
      <ContentLayout>
        <NewPiezoReport />
      </ContentLayout>
     </ProtectedRoute>
    
  },

  {
    path: "/reports/incidents/new-incident",
    element: 
    <ProtectedRoute>
      <ContentLayout>
        <NewIncidentReport />
      </ContentLayout>
     </ProtectedRoute>
    
  },

  {
    path: "/reports/piezometers/:id",
    element: 
    <ProtectedRoute>
      <ContentLayout>
        <PiezoReportDetails />
      </ContentLayout>
     </ProtectedRoute>
    
  },

  {
    path: "/reports/incidents/:id",
    element: 
    <ProtectedRoute>
      <ContentLayout>
        <IncidentReportDetails />
      </ContentLayout>
     </ProtectedRoute>
    
  },

  {
    path: "/login",
    element: 
    <ProtectedLogIn>
      <Login />
              
    </ProtectedLogIn>
    
  },

  {
    path: "/biannual-visits",
    element: 
    <ProtectedRoute>
                <ContentLayout>
                  <BianualVisit />
                </ContentLayout>
              </ProtectedRoute>
    
  },

  {
    path: "/biannual-visits/:id",
    element: 
    <ProtectedRoute>
                <ContentLayout>
                <VisitDetails />
                </ContentLayout>
              </ProtectedRoute>
    
  },

  {
    path: "/biannual-visits/:id",
    element: 
    <ProtectedRoute>
                <MediaPlayer />
              </ProtectedRoute>
    
  },

  
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
    </QueryClientProvider>
    
  </React.StrictMode>
);
