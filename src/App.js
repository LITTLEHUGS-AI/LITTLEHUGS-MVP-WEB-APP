// src/App.js
import React from "react";
import { AuthProvider } from "./lib/AuthContext";
import AppRoutes from "./lib/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "./lib/useToastContext";
import { WaitlistProvider } from "./lib/WaitlistContext";
import { WellnessProvider, useWellness } from "./lib/WellnessContext";
import WaitlistModal from "./components/common/WaitlistModal";
import WomenWellnessFlow from "./components/landingpage/WomenWellnessFlow";
import { Analytics } from "@vercel/analytics/react";
import "react-toastify/dist/ReactToastify.css";

// Mounts the wellness flow modal — must be inside WellnessProvider
const WellnessFlowMount = () => {
  const { isOpen, closeWellnessFlow } = useWellness();
  return isOpen ? <WomenWellnessFlow onClose={closeWellnessFlow} /> : null;
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AuthProvider>
          <WaitlistProvider>
            <WellnessProvider>
              <WaitlistModal />
              <WellnessFlowMount />
              <AppRoutes />
            </WellnessProvider>
          </WaitlistProvider>
        </AuthProvider>
        <Analytics />
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
