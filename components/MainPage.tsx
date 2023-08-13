"use client";
import { useWallet } from "@solana/wallet-adapter-react";

import React from "react";
import useMounted from "@/hooks/useMounted";
import useDapp from "@/hooks/useDapp";

const MainPage = () => {
  const wallet = useWallet();
  const { hasMounted } = useMounted();
  const {
    dataCounter,
    amount,
    readCounter,
    updateCounter,
    initialize,
    handleChangeName,
  } = useDapp();

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#1d1d1e]">
        <div className="flex flex-col justify-center items-center max-w-[1440px] gap-4 grow">
          {wallet.connected ? (
            <>
              <h1 className="text-white text-3xl font-bold uppercase ">
                Solana Bootcamp Dapp
              </h1>
              <div className="max-w-[200px] w-full flex flex-col gap-2">
                <div className="flex flex-col justify-start items-center gap-4">
                  <p className="text-white text-2xl">Amount: </p>
                  <input
                    type="number"
                    placeholder="Input Number Ex: 1"
                    value={amount}
                    onChange={handleChangeName}
                    onBlur={handleChangeName}
                    className="rounded-xl text-md px-2 py-3 text-black bg-[#EBEBEB]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                  <button
                    onClick={() => initialize()}
                    className="w-full text-white bg-[#532da7] rounded-md py-3 px-2 hover:brightness-150"
                  >
                    Init
                  </button>
                  <button
                    onClick={() => updateCounter(amount)}
                    className="w-full text-white bg-[#532da7] rounded-md py-3 px-2 hover:brightness-150"
                  >
                    Write
                  </button>
                  <button
                    onClick={() => readCounter()}
                    className="w-full text-white bg-[#532da7] rounded-md py-3 px-2 hover:brightness-150"
                  >
                    Read
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-evenly items-center">
                  <h1 className="text-white">Counter Data: </h1>
                  <h1 className="text-white">{dataCounter}</h1>
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-white text-3xl font-bold uppercase ">
              Connect Your Wallet First!
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
