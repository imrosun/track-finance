import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CATEGORIES } from '@/constants/categories';

function getCategoryData(transactions) {
  return CATEGORIES.map((cat) => ({
    category: cat,
    amount: transactions
      .filter(tx => tx.category === cat)
      .reduce((sum, tx) => sum + tx.amount, 0),
  })).filter(d => d.amount > 0);
}

export default function CategoryBarChart({ transactions }) {
  const data = getCategoryData(transactions);

  return (
    <div>
      <h3 className="font-semibold mb-2">Category Breakdown (Bar)</h3>
      <ResponsiveContainer width={350} height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
