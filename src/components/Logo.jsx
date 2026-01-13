import React from "react";
import { ScanLine } from "lucide-react";

const Logo = ({ size = "text-2xl", iconSize = 24 }) => {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Icon Kotak */}
      <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
        <ScanLine
          className="text-emerald-500"
          size={iconSize}
          strokeWidth={2.5}
        />
      </div>

      {/* Typography: TrustBite (T & B Emerald) */}
      <h1
        className={`${size} font-extrabold tracking-tight text-slate-800 dark:text-white leading-none`}
      >
        <span className="text-emerald-500">T</span>rust
        <span className="text-emerald-500">B</span>ite
      </h1>
    </div>
  );
};

export default Logo;
