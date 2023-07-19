import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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
import MediaPlayer from "./components/BVisits/MediaPlayer";

import PageLayout from "./components/pages/PageLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const router = createBrowserRouter([
  {
    path: "/",

    element: <PageLayout />,

    children: [
      {
        path: "",
        element:
          process.env.NODE_ENV === "production" ? (
            <Navigate to="/login" />
          ) : (
            <Navigate to="/monitoring-map" />
          ),
      },
      {
        path: "monitoring-map",
        element: <Index />,
      },

      {
        path: "piezometer-readings",
        element: <PaddockLectures />,
      },

      {
        path: "reports",
        children: [
          {
            path: "piezometers",
            children: [
              {
                path: "",
                element: <PiezoReports />,
              },
              {
                path: "new-report",
                element: <NewPiezoReport />,
              },
              {
                path: ":id",
                element: <PiezoReportDetails />,
              },
            ],
          },
          {
            path: "incidents",
            children: [
              {
                path: "",
                element: <IncidentReports />,
              },
              {
                path: "new-incident",
                element: <NewIncidentReport />,
              },
              {
                path: ":id",
                element: <IncidentReportDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "/biannual-visits/:id",
        element: <BianualVisit />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <SkeletonTheme baseColor="#d9d9d9" highlightColor="#c9c9c9">
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SkeletonTheme>
  </React.StrictMode>
);
