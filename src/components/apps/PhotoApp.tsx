"use client";

import profilePic from "@/assets/Returaj_Proshad.png";
import { personal } from "@/data/portfolio";

export default function PhotoApp() {
  return (
    <div className="photo-app">
      <img src={profilePic.src} alt={personal.fullName} />
    </div>
  );
}
