import { Outlet } from "react-router";
import Navbar from "@/components/Navbar.tsx";

function App() {
  return (
    <div className={"w-screen h-screen flex flex-col bg-background"}>
      <nav className={"bg-primary border-b border-black p-2"}>
        <Navbar />
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
