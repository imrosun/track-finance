import { connectToDatabase } from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), { status: 404 });
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();
    const updated = await Transaction.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
