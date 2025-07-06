"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import SummaryCards from "@/app/components/SummaryCards";
import TransactionList from "@/app/components/TransactionList";
import TransactionFormModal from "@/app/components/TransactionModal";
import BudgetModal from "@/app/components/BudgetModal";
import { getBrowserId } from "@/lib/browser-id";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BudgetEditModal from "../components/BudgetEditModel";
import CategoryPieChart from "../components/CategoryPieChart";
import CategoryBarChart from "../components/CategoryBarChart";

function getCurrentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function Dashboard() {
  const [budget, setBudget] = useState(null);
  const [spent, setSpent] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showTxModal, setShowTxModal] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [showEditBudget, setShowEditBudget] = useState(false);

  const browserId = typeof window !== "undefined" ? getBrowserId() : "";
  const month = getCurrentMonth();

  // Fetch budget and transactions
  const fetchData = async () => {
    setLoading(true);
    // Get budget
    const budgetRes = await fetch(`/api/budget?browserId=${browserId}&month=${month}`);
    const budgetData = await budgetRes.json();
    setBudget(budgetData?.amount || null);
    // Get transactions
    const txRes = await fetch(`/api/transactions?browserId=${browserId}&month=${month}`);
    const txData = await txRes.json();
    setTransactions(Array.isArray(txData) ? txData : []);
    const totalSpent = (Array.isArray(txData) ? txData : []).reduce((sum, tx) => sum + (tx.amount || 0), 0);
    setSpent(totalSpent);
    setLoading(false);
  };

  useEffect(() => {
    if (!browserId) return;
    fetchData();
  }, [browserId]);

  // Show budget modal only if not set in localStorage for this month
  useEffect(() => {
    if (budget === null && browserId) {
      const budgetFlag = localStorage.getItem(`budgetSet-${month}`);
      if (!budgetFlag) {
        setShowBudgetModal(true);
      }
    }
  }, [budget, browserId, month]);

  const handleBudgetSubmit = async (amount) => {
    await fetch("/api/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ browserId, month, amount }),
    });
    localStorage.setItem(`budgetSet-${month}`, "1");
    setShowBudgetModal(false);
    fetchData();
  };

   const handleEditBudget = async (amount) => {
    await fetch("/api/budget", {
      method: "POST", // or PATCH if your API supports it
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ browserId, month, amount }),
    });
    setShowEditBudget(false);
    fetchData();
  };

  const handleTxSuccess = () => {
    setShowTxModal(false);
    setEditTx(null);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-100">
      <Header />
      <main className="max-w-5xl mx-auto w-full px-2 sm:px-6 py-6 flex flex-col gap-6">
        <SummaryCards
          budget={budget}
          spent={spent}
          transactions={transactions}
          onEditBudget={() => setShowEditBudget(true)}
        />
        
        {/* Charts: stacked on mobile, side by side on md+ */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <CategoryPieChart transactions={transactions} />
          </div>
          <div className="flex-1">
            <CategoryBarChart transactions={transactions} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => {
              setEditTx(null);
              setShowTxModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </Button>
        </div>
        <TransactionList
          transactions={transactions}
          onChange={fetchData}
          loading={loading}
          onEdit={(tx) => {
            setEditTx(tx);
            setShowTxModal(true);
          }}
        />
      </main>
      <BudgetEditModal
        open={showEditBudget}
        onClose={() => setShowEditBudget(false)}
        onSubmit={handleEditBudget}
        initialAmount={budget}
      />
      <BudgetModal open={showBudgetModal} onSubmit={handleBudgetSubmit} />
      <TransactionFormModal
        open={showTxModal}
        onClose={() => {
          setShowTxModal(false);
          setEditTx(null);
        }}
        onSuccess={handleTxSuccess}
        initialData={editTx}
      />
    </div>
  );
}
