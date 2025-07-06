"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CATEGORIES } from "@/constants/categories";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

const transactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
});

function transformInitialData(initialData) {
  if (!initialData) return null;
  return {
    ...initialData,
    amount: initialData.amount ? String(initialData.amount) : "",
    date: initialData.date
      ? new Date(initialData.date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  };
}

export default function TransactionForm({
  onSuccess,
  initialData,
  onCancel,
  isEdit,
}) {
  const [serverError, setServerError] = useState("");
  const defaultValues = useMemo(
    () =>
      transformInitialData(initialData) || {
        title: "",
        description: "",
        amount: "",
        category: CATEGORIES[0],
        date: new Date().toISOString().slice(0, 10),
      },
    [initialData]
  );

  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    setServerError("");
    try {
      const url = isEdit
        ? `/api/transactions/${initialData._id}`
        : "/api/transactions";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, amount: Number(values.amount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save transaction");
      reset();
      if (onSuccess) onSuccess(data);
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 pt-2"
        autoComplete="off"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Grocery shopping"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={CATEGORIES[0]}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Optional details"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {serverError && (
          <div className="text-red-600 text-sm text-center">
            {serverError}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 text-base rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isEdit
              ? isSubmitting
                ? "Updating..."
                : "Edit Transaction"
              : isSubmitting
              ? "Saving..."
              : "Add Transaction"}
          </Button>

        </div>
      </form>
    </Form>
  );
}
