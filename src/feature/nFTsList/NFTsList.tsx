import React from "react";
import { formatDate } from "../../utils";
import Table from "../../shared/table/Table";

interface NFT {
  tx_hash: string;
  block_time: number;
  block_height: number;
  tx_index: number;
}

const NFTsList: React.FC<{ nfts: NFT[] }> = ({ nfts }) => {
  const columns: {
    label: string;
    dataKey: keyof NFT;
    render?: (value: string | number) => string;
  }[] = [
    {
      label: "TX Hash",
      dataKey: "tx_hash",
      render: (value) =>
        typeof value === "string"
          ? `${value.substring(0, 10)}...`
          : value.toString(),
    },
    {
      label: "Dátum",
      dataKey: "block_time",
      render: (value) =>
        typeof value === "number" ? formatDate(value) : value.toString(),
    },
    { label: "Block Height", dataKey: "block_height" },
    { label: "TX Index", dataKey: "tx_index" },
  ];

  return (
    <div>
      <h2>NFT:</h2>
      <Table columns={columns} data={nfts} maxItems={4} />
    </div>
  );
};

export default NFTsList;
