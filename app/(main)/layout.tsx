import React, { PropsWithChildren } from "react";
import NavBar from "./NavBar";

function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex  min-h-screen flex-col">
      <NavBar />
      {children}
    </div>
  );
}

export default layout;
