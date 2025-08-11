"use client";

import Navbar from "./Navbar";

export function MiniAppDashboard() {
  return (
    <>
      <Navbar />
      <div className="max-w-xl w-full min-h-screen bg-white p-4 mx-auto">
        <p>
          {
            "Some contents are supposed to be shown here but I don't know the contents"
          }
        </p>
      </div>
    </>
  );
}
