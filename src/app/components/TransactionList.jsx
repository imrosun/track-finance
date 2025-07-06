"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Edit, Trash2, Loader2, Plus } from "lucide-react";
import TransactionFormModal from "./TransactionModal";

export default function TransactionList({ transactions = [], onChange, loading }) {
  const [editTx, setEditTx] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      onChange && onChange();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Transaction List</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <div className="min-w-[600px] w-full pl-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="animate-spin inline-block mr-2" />
                    Loading...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow key={tx._id} className="hover:bg-gray-50">
                    <TableCell>{tx.title}</TableCell>
                    <TableCell className="hidden sm:table-cell">{tx.description}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>{tx.category}</TableCell>
                    <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditTx(tx)}
                          aria-label="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(tx._id)}
                          disabled={deletingId === tx._id}
                          aria-label="Delete"
                        >
                          {deletingId === tx._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-600" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* Add/Edit Modal */}
      <TransactionFormModal
        open={showAdd || !!editTx}
        initialData={editTx}
        onClose={() => {
          setEditTx(null);
          setShowAdd(false);
        }}
        onSuccess={() => {
          setEditTx(null);
          setShowAdd(false);
          onChange && onChange();
        }}
      />
    </Card>
  );
}
