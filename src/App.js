// src/App.js
import React from "react";
import { AuthProvider } from "./lib/AuthContext";
import AppRoutes from "./lib/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "./lib/useToastContext";
import { WaitlistProvider } from "./lib/WaitlistContext";
import WaitlistModal from "./components/common/WaitlistModal";
import ChatWidget from "./components/common/ChatWidget";
import "react-toastify/dist/ReactToastify.css";

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
            <WaitlistModal />
            <AppRoutes />
            <ChatWidget />
          </WaitlistProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
