import { useState } from "react";
import MobileNav from "./MobileNav";
import { navItems } from "../../utils/navItems";
import Logo from "../logo";
import { useRouter } from "next/router";

const NavLink = ({ to, children }: any) => {
  return (
    <a href={to} className={`mx-4`}>
      {children}
    </a>
  );
};

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const textColor = router.asPath !== "/404" ? "white" : "#003B5C";
  return (
    <nav
      className="flex py-5 items-center z-10 sticky top-0 px-5 md:px-[5%] lg:px-[10%]"
      style={{
        backgroundColor: "transparent",
        color: textColor,
      }}
    >
      <MobileNav open={open} setOpen={setOpen} navItems={navItems} />
      <div className="w-[65%] lg:w-[30%] flex items-center justify-start cursor-pointer">
        <Logo color={textColor} />
      </div>
      <div className="w-[50%] lg:w-[70%] flex justify-end items-center ">
        <div
          className="z-50 flex relative w-8 h-5 flex-col justify-between items-center lg:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <span
            className={`h-[2px] w-full rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
            style={{ backgroundColor: textColor }}
          />
          <span
            className={`h-[2px] w-full rounded-lg transition-all duration-300 ease-in-out ${
              open ? "w-0" : "w-full"
            }`}
            style={{ backgroundColor: textColor }}
          />
          <span
            className={`h-[2px] w-full rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
            style={{ backgroundColor: textColor }}
          />
        </div>

        <div className="hidden lg:flex items-center text-xl">
          {navItems.map((item) => {
            return (
              <NavLink to={item.url} key={item.title}>
                <p>{item.title}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
