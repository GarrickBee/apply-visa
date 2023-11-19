import * as React from "react";
import { FaGithub } from "react-icons/fa";

const FooterComp: React.FC<{}> = () => {
  return (
    <footer className="my-20">
      <p className="text-center text-xs text-slate-500 mt-1">
        Made by{" "}
        <a
          href="https://web3templates.com"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          Garlic
        </a>
      </p>
    </footer>
  );
};

export default FooterComp;
