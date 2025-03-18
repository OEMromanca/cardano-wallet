import axios from "axios";

const BLOCKFROST_API_KEY = "mainnetRUrPjKhpsagz4aKOCbvfTPHsF0SmwhLc";
const BASE_URL = "https://cardano-mainnet.blockfrost.io/api/v0/addresses/";

export const fetchBalance = async (walletAddress: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${walletAddress}`, {
      headers: { project_id: BLOCKFROST_API_KEY },
    });
    return response.data.amount;
  } catch (error) {
    return {
      error:
        "Chyba pri načítaní zostatku: " +
        (error instanceof Error ? error.message : "Nezadaná chyba"),
    };
  }
};

export const fetchNfts = async (walletAddress: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${walletAddress}/transactions`,
      {
        headers: { project_id: BLOCKFROST_API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    return {
      error:
        "Chyba pri načítaní NFT: " +
        (error instanceof Error ? error.message : "Nezadaná chyba"),
    };
  }
};
