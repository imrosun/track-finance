import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { CATEGORIES } from '@/constants/categories';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6699', '#8884d8'];

function getCategoryData(transactions) {
  const data = CATEGORIES.map((cat) => ({
    category: cat,
    amount: transactions
      .filter(tx => tx.category === cat)
      .reduce((sum, tx) => sum + tx.amount, 0),
  })).filter(d => d.amount > 0);
  return data;
}

export default function CategoryPieChart({ transactions }) {
  const data = getCategoryData(transactions);

  return (
    <div>
      <h3 className="font-semibold mb-2">Expenses by Category</h3>
      <PieChart width={350} height={300}>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
