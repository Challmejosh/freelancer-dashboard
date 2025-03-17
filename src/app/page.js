// import Image from "next/image";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <div className="h-screen mx-5 overflow-y-scroll w-full [&::-webkit-scrollbar]:hidden scrollbar ">
      <Projects />
    </div>
  );
}
