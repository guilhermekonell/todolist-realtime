"use client";

import React from "react";
import { BeatLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-700">
      <BeatLoader loading={true} color="#36d7b7" />
    </div>
  );
}
