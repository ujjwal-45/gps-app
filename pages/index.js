import Image from "next/image";
import { Inter } from "next/font/google";
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ["latin"] });

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    
    <div>
      <Map />
    </div>
  );
}
