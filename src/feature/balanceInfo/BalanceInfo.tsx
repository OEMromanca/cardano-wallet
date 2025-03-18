import React from "react";
import Table from "../../shared/table/Table";

interface Balance {
  quantity: string;
  unit: string;
}

const BalanceInfo: React.FC<{ balance: Balance[] }> = ({ balance }) => {
  const columns: { label: string; dataKey: keyof Balance }[] = [
    { label: "Unit", dataKey: "unit" },
    { label: "Quantity", dataKey: "quantity" },
  ];

  return (
    <div>
      <h2>Zostatok:</h2>
      <Table columns={columns} data={balance} maxItems={5} />
    </div>
  );
};

export default BalanceInfo;
