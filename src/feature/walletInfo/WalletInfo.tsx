import React, { useState, useCallback, useMemo } from "react";
import { fetchBalance, fetchNfts } from "../../api/api";
import Input from "../../shared/input/Input";
import Button from "../../shared/button/Button";
import BalanceInfo from "../balanceInfo/BalanceInfo";
import Message from "../../shared/message/Message";

import { z } from "zod";
import useZodValidation from "../../hooks/useZodValidation";
import "./WalletInfo.css";
import NFTsList from "../nFTsList/NFTsList";

const walletAddressSchema = z
  .string()
  .min(1, { message: "Adresa nemôže byť prázdna" })
  .regex(/^[a-z0-9]+[a-z0-9]{42,}$/, {
    message: "Adresa musí byť platná a mať správny formát.",
  });

interface NFT {
  tx_hash: string;
  block_time: number;
  block_height: number;
  tx_index: number;
}

interface Balance {
  quantity: string;
  unit: string;
}

const WalletInfo = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<Balance[] | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [nftError, setNftError] = useState<string | null>(null);

  const { validate } = useZodValidation(walletAddressSchema);

  const isValidWalletAddress = useMemo(
    () => validate(walletAddress),
    [walletAddress]
  );

  const getBalanceData = useCallback(async (walletAddress: string) => {
    const balanceData = await fetchBalance(walletAddress);
    if (balanceData.error) {
      setBalanceError(balanceData.error);
    } else {
      setBalance(balanceData);
    }
  }, []);

  const getNftData = useCallback(async (walletAddress: string) => {
    const nftData = await fetchNfts(walletAddress);
    if (nftData.error) {
      setNftError(nftData.error);
    } else {
      setNfts(nftData);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setBalanceError(null);
    setNftError(null);
    setBalance(null);
    setNfts([]);

    if (!isValidWalletAddress.isValid) {
      setBalanceError(isValidWalletAddress.error);
      setNftError(null);
      setLoading(false);
      return;
    }

    await getBalanceData(walletAddress);
    await getNftData(walletAddress);

    setLoading(false);
  }, [isValidWalletAddress, walletAddress, getBalanceData, getNftData]);

  const handleAddressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setWalletAddress(e.target.value);
    },
    []
  );

  const errors = [];
  if (balanceError) errors.push(balanceError);
  if (nftError) errors.push(nftError);

  return (
    <>
      <label>
        <strong>Zadajte adresu peňaženky:</strong>
      </label>
      <div className="wallet-address">
        <Input
          id="walletAddress"
          type="text"
          value={walletAddress}
          onChange={handleAddressChange}
          placeholder="Napíšte adresu"
        />
        <Button onClick={fetchData} variant="primary">
          Zobraziť dáta
        </Button>
      </div>

      {errors.length > 0 && <Message type="error" message={errors} />}
      {loading && <Message type="loading" />}

      {balance && !balanceError && <BalanceInfo balance={balance} />}
      {nfts.length > 0 && !nftError && <NFTsList nfts={nfts} />}
    </>
  );
};

export default WalletInfo;
