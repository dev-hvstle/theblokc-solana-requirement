import React, { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import IDL from "../lib/idl/idl.json";
import * as web3 from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

const useDapp = () => {
  const wallet = useWallet();
  const programId = new anchor.web3.PublicKey(
    "4dmn9VwPNFDYZvJVJHDVJVQwJ3MBf15StoKrbtLeR5Cv"
  );
  const connection = new anchor.web3.Connection(web3.clusterApiUrl("devnet"));
  const systemProgram = anchor.web3.SystemProgram;
  const [dataCounter, setDataCounter] = useState<any>(0);
  const [amount, setAmount] = useState<any>("");

  function getProgramInstance(connection: any, wallet: any) {
    const provider = new anchor.AnchorProvider(
      connection,
      wallet,
      anchor.AnchorProvider.defaultOptions()
    );

    const program = new anchor.Program(IDL as any, programId, provider);

    return program;
  }

  const program = getProgramInstance(connection, wallet);

  async function initialize() {
    const [counter, _counterBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [wallet.publicKey?.toBytes()!],
        programId
      );

    console.log("Your counter address", counter.toString());
    try {
      const tx = await program.methods
        .createCounter()
        .accounts({
          authority: new web3.PublicKey(wallet.publicKey ?? ""),
          counter: counter,
          systemProgram: systemProgram.programId,
        })
        .rpc();

      console.log("Your transaction signature", tx);
      alert("Transaction Completed!");
    } catch (err) {
      console.log(err);
    }
  }

  async function updateCounter(amount: any) {
    const [counter, _counterBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [wallet.publicKey?.toBytes()!],
        programId
      );

    console.log("Your counter address", counter.toString());
    try {
      const tx = await program.methods
        .updateCounter(new anchor.BN(amount))
        .accounts({
          authority: new web3.PublicKey(wallet.publicKey ?? ""),
          counter: counter,
        })
        .rpc();
      console.log("Your transaction signature " + tx);
      setAmount("");
      alert("Transaction Completed!");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async function readCounter() {
    const [counter, _counterBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [wallet.publicKey?.toBytes()!],
        programId
      );
    try {
      const counterAccount = await program.account.counter.fetch(counter);

      setDataCounter(counterAccount.count?.toString());

      console.log(
        "Your transaction signature",
        counterAccount.count?.toString()
      );
    } catch (err) {
      console.log(err);
    }
  }

  function handleChangeName(event: any) {
    setAmount(event.target.value);
  }

  useEffect(() => {
    if (wallet.connected) readCounter();
  }, [dataCounter, wallet.connected]);

  return {
    dataCounter,
    amount,

    initialize,
    updateCounter,
    readCounter,
    setAmount,
    handleChangeName,
  };
};

export default useDapp;
