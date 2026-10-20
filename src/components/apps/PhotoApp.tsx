"use client";

import Image from "next/image";
import profilePic from "@/assets/Returaj_Proshad.png";
import { personal } from "@/data/portfolio";

export default function PhotoApp() {
  return (
    <div className="photo-app">
      <Image
        src={profilePic}
        alt={`${personal.fullName}, ${personal.role}`}
        sizes="(max-width: 768px) 90vw, 440px"
        placeholder="blur"
      />
    </div>
  );
}
