import Image from "next/image";
import Login from "./login/page";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="">
     
     <Dashboard/>
     
        
      
      </main>
    </div>
  );
}
