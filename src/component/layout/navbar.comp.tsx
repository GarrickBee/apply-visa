import * as React from "react";
import { FaGithub } from "react-icons/fa";

const NavBarComponent: React.FC<{}> = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-5">
        <header className="flex flex-col lg:flex-row justify-between items-center my-5">
          <div className="flex w-full lg:w-auto items-center justify-between">
            <a href="/" className="text-lg">
              <span className="font-bold text-slate-800">ApplyVisa</span>
              <span className="text-slate-500">.info</span>
            </a>
          </div>
          <div>
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://github.com/GarrickBee/apply-visa"
                target="_blank"
                className="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-4 py-2 bg-black text-white hover:bg-gray-800 border-2 border-transparent"
              >
                <span className="flex items-center">
                  <FaGithub className="mr-2" />
                  Star
                </span>
              </a>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default NavBarComponent;
