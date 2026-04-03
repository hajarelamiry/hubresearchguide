"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"; // ✅ Ajouter
import { useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
          <Toaster />
          <Sonner />
          <style>{`
           .grecaptcha-badge {
             bottom: 16px !important;
             right: auto !important;
             left: 16px !important;
             width: 70px !important;
             overflow: hidden !important;
             transition: width 0.3s ease !important;
           }
           .grecaptcha-badge:hover {
             width: 256px !important;
           }
         `}</style>
          {children}
          <WhatsAppButton />
        </GoogleReCaptchaProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}