"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TransactionForm from "./TransactionForm";

export default function TransactionFormModal({ open, onClose, onSuccess, initialData }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>
        <TransactionForm
          initialData={initialData}
          onSuccess={onSuccess}
          onCancel={onClose}
          isEdit={!!initialData}
        />
      </DialogContent>
    </Dialog>
  );
}
