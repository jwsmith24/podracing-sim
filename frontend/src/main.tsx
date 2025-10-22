import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import PodBuilder from "@/pages/PodBuilder.tsx";
import Home from "@/pages/Home.tsx";
import Track from "@/components/Track.tsx";
import Garage from "@/pages/Garage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"builder"} element={<PodBuilder />} />
          <Route path={"garage"} element={<Garage />} />
          <Route path={"race"} element={<Track />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
