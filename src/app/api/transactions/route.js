import { connectToDatabase } from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { title, description, created_at, amount, category, date } = data;

    if (!title || !amount || !category || !date) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const transaction = await Transaction.create({
      title,
      description,
      created_at: created_at ? new Date(created_at) : new Date(),
      amount,
      category,
      date: new Date(date),
    });

    return new Response(JSON.stringify(transaction), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find().sort({ date: -1 });
    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
