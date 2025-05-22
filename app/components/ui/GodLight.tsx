"use client";

import React, { type FC } from "react";

export default function GodLight() {
  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full z-40" style={{height: 400}}>
      <div className="absolute left-1/2 top-0 w-[400px] h-[400px] -translate-x-1/2 bg-godlight opacity-80 blur-2xl animate-godlight-move" />
    </div>
  );
} 