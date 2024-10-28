import React from "react";
import transactions from "./assets/transactions.svg"
function NoTransactions() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
      <img src={transactions} style={{ width: "380px", padding: "2rem" }} />
      <p style={{ textAlign: "center", fontSize: "1.1rem" ,marginLeft:'1rem' }}>
        You Have No Transactions Currently!
      </p>
    </div>
  );
}

export default NoTransactions;