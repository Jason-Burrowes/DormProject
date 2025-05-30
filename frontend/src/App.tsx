
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AIAssistantProvider } from "@/contexts/AIAssistantContext";

// Layouts
import AppLayout from "@/components/layout/AppLayout";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import GatePasses from "@/pages/GatePasses";
import Residents from "@/pages/Residents";
import Leaves from "@/pages/Leaves";
import SickRecords from "@/pages/SickRecords";
import Rooms from "@/pages/Rooms";
import Lockers from "@/pages/Lockers";
import WorkExperience from "@/pages/WorkExperience";
import Internships from "@/pages/Internships";
import UserManagement from "@/pages/UserManagement";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Security from "@/pages/Security";
import NurseReferrals from "@/pages/NurseReferrals";
import NurseVisitHistory from "@/pages/NurseVisitHistory";
import Notifications from "@/pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AIAssistantProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Protected routes */}
              <Route path="/" element={<AppLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="gate-passes" element={<GatePasses />} />
                <Route path="residents" element={<Residents />} />
                <Route path="leaves" element={<Leaves />} />
                <Route path="sick-records" element={<SickRecords />} />
                <Route path="nurse-referrals" element={<NurseReferrals />} />
                <Route path="nurse-visit-history" element={<NurseVisitHistory />} />
                <Route path="rooms" element={<Rooms />} />
                <Route path="lockers" element={<Lockers />} />
                <Route path="work-experience" element={<WorkExperience />} />
                <Route path="internships" element={<Internships />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="security" element={<Security />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AIAssistantProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
