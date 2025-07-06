import mongoose from "mongoose";
const BudgetSchema = new mongoose.Schema({
  browserId: { type: String, required: true, index: true },
  month: { type: String, required: true }, // e.g. "2025-07"
  amount: { type: Number, required: true },
});
export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
