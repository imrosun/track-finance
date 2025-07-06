import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  created_at: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
