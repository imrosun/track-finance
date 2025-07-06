import { Card, CardContent } from '@/components/ui/card';

function formatRupee(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return "--";
  return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function SummaryCards({ transactions = [], budget, spent }) {
  const remaining = Math.max(0, (budget || 0) - (spent || 0));

  return (
    <div className="flex flex-wrap gap-4">
      <Card>
        <CardContent className="py-4">
          <div className="text-gray-500 text-sm">Budget</div>
          <div className="text-2xl font-bold text-amber-500">
            {formatRupee(budget)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4">
          <div className="text-gray-500 text-sm">Expenses/Spent</div>
          <div className="text-2xl font-bold text-red-500">
            {formatRupee(spent)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4">
          <div className="text-gray-500 text-sm">Remaining</div>
          <div className="text-2xl font-bold text-green-600">
            {formatRupee(remaining)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
