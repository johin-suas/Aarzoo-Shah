import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import IndexGa from "./pages/IndexGa";
import ThankYouGa from "./pages/ThankYouGa";
import Indexfb2 from "./pages/Indexfb2";
import ThankYouFb2 from "./pages/ThankuFb2";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fb2" element={<Indexfb2 />} />
          <Route path="/ga" element={<IndexGa/>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/ty-smart-wealth" element={<ThankYou/>} />
          <Route path="/ty-smart-wealth-fb2" element={<ThankYouFb2/>} />
          <Route path="/ty-smart-wealth-ga" element={<ThankYouGa/>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
