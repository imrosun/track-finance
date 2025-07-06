import { connectToDatabase } from "@/lib/db";
import Budget from "@/models/Budget";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { browserId, month, amount } = await req.json();
    if (!browserId || !month || !amount) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }
    // Upsert budget for this browserId and month
    const budget = await Budget.findOneAndUpdate(
      { browserId, month },
      { amount },
      { upsert: true, new: true }
    );
    return new Response(JSON.stringify(budget), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const browserId = searchParams.get("browserId");
    const month = searchParams.get("month");
    if (!browserId || !month) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }
    const budget = await Budget.findOne({ browserId, month });
    return new Response(JSON.stringify(budget), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
