import { Route, Routes, useLocation } from "react-router-dom";
import Index from "./components/pages/Index";
import ContentLayout from "./components/ContentLayout";
import PaddockLectures from "./components/pages/PaddockLectures";
import Login from "./components/pages/Login";
import PiezoReports from "./components/pages/PiezoReports";
import NewPiezoReport from "./components/pages/NewPiezoReport";
import PiezoReportDetails from "./components/pages/PiezoReportDetails";
import IncidentReports from "./components/pages/IncidentReports";
import NewIncidentReport from "./components/pages/NewIncidentReport";
import IncidentReportDetails from "./components/pages/IncidentReportDetails";
import { AnimatePresence } from "framer-motion";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLogIn from "./components/ProtectedLogIn";
import BianualVisit from "./components/pages/BianualVisit";
import VisitDetails from "./components/pages/VisitDetails";
import MediaPlayer from "./components/BVisits/MediaPlayer";

function App() {
  const location = useLocation();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/reports">
            <Route path="piezometers">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ContentLayout>
                      <PiezoReports />
                    </ContentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="new-report"
                element={
                  <ProtectedRoute>
                    <ContentLayout>
                      <NewPiezoReport />
                    </ContentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <ContentLayout>
                      <PiezoReportDetails />
                    </ContentLayout>
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="incidents">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ContentLayout>
                      <IncidentReports />
                    </ContentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="new-incident"
                element={
                  <ProtectedRoute>
                    <ContentLayout>
                      <NewIncidentReport />
                    </ContentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <ContentLayout>
                      <IncidentReportDetails />
                    </ContentLayout>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>

          <Route
            path="/paddock-lectures"
            element={
              // <ProtectedRoute>
                // <ContentLayout>
                  <PaddockLectures />
                // </ContentLayout>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedLogIn>
                <Login />
              </ProtectedLogIn>
            }
          />
          <Route
            path="/biannual-visits"
            element={
              <ProtectedRoute>
                <ContentLayout>
                  <BianualVisit />
                </ContentLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/biannual-visits/:id"
            element={
              <ProtectedRoute>
                <ContentLayout>
                  <VisitDetails />
                </ContentLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/player/:id"
            element={
              <ProtectedRoute>
                <MediaPlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              // <ProtectedRoute>
                <Index />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
