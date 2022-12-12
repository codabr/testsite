import Link from "next/link";

const MobileNav = ({ open, setOpen, navItems }: any) => {
  return (
    <div
      className={`absolute top-[80px] pt-10 left-0 h-screen w-screen bg-white  z-50 transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col items-end ml-5 space-y-5 px-5">
        {navItems.map((item: any) => {
          return (
            <Link key={item.title} className="text-[40px] ml-5" href={item.url}>
              <span
                className="text-2xl text-hs-blue"
                onClick={() =>
                  setTimeout(() => {
                    setOpen(!open);
                  }, 100)
                }
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default MobileNav;
