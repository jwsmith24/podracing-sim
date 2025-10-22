import { Outlet } from "react-router";
import Navbar from "@/components/Navbar.tsx";

function App() {
  return (
    <div className={"w-screen h-screen flex flex-col bg-slate-700"}>
      <nav className={"bg-gray-600 p-2 border-b border-black"}>
        <Navbar />
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
