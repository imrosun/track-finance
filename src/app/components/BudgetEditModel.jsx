"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Enter a valid positive number",
  }),
});

export default function BudgetEditModal({ open, onClose, onSubmit, initialAmount }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { amount: initialAmount ? String(initialAmount) : "" },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    await onSubmit(Number(values.amount));
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Input
            type="number"
            placeholder="Enter new budget amount"
            {...form.register("amount")}
            min={0}
            step={0.01}
            className="w-full"
          />
          {form.formState.errors.amount && (
            <div className="text-red-600 text-sm">
              {form.formState.errors.amount.message}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Budget"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
