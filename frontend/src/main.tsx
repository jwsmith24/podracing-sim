import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

import Home from "@/pages/Home.tsx";
import Track from "@/components/Track.tsx";
import Garage from "@/pages/Garage.tsx";
import BuildPage from "@/pages/BuildPage.tsx";

import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"builder"} element={<BuildPage />} />
          <Route path={"garage"} element={<Garage />} />
          <Route path={"race"} element={<Track />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster richColors position={"bottom-right"} />
  </StrictMode>,
);
