"use client";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  return (
    <div className="fixed top-0 flex justify-center items-center bg-[#1d1d1e] p-5 w-screen">
      <div className="flex flex-row justify-between items-center gap-2 max-w-[1440px] grow">
        <h1 className="text-white">Solana Test</h1>
        <div className="flex flex-row gap-2">
          <div className="bg-[#532da7] rounded-md">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
