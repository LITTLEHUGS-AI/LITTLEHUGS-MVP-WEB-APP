import React from "react";

import { AuthProvider } from "./lib/AuthContext";
import AppRoutes from "./lib/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "./lib/useToastContext";
// import TestToastContainer from "./components/common/TestToastContainer.js";

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
        <ToastContainer />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
