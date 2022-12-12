import React, { FC, ReactNode } from "react";
import Navbar from "../navbar/navbar.component";
import Footer from "..//footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between mx-auto">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
