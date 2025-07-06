"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/app/components/TransactionForm";
import TransactionList from "@/app/components/TransactionList";
import CategoryPieChart from "@/app/components/CategoryPieChart";
import CategoryBarChart from "@/app/components/CategoryBarChart";
import SummaryCards from "@/app/components/SummaryCards";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col gap-6 px-2 sm:px-6 max-w-5xl mx-auto w-full">
      <SummaryCards transactions={transactions} />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <CategoryPieChart transactions={transactions} />
        </div>
        <div className="flex-1">
          <CategoryBarChart transactions={transactions} />
        </div>
      </div>
      <TransactionForm onSuccess={fetchTransactions} />
      <TransactionList
        transactions={transactions}
        onChange={fetchTransactions}
        loading={loading}
      />
    </div>
  );
}
