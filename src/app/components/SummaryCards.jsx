import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

function formatRupee(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return "--";
  return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function SummaryCards({ transactions = [], budget, spent, onEditBudget }) {
  const remaining = Math.max(0, (budget || 0) - (spent || 0));

  return (
    <div className="flex flex-wrap gap-4">
      <Card>
        <CardContent className=" flex items-center justify-between gap-2">
          <div>
            <div className="text-gray-500 text-sm">Budget</div>
            <div className="text-2xl font-bold text-amber-500">
              {formatRupee(budget)}
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Edit Budget"
            onClick={onEditBudget}
            className="ml-2"
          >
            <Pencil className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="">
          <div className="text-gray-500 text-sm">Expenses/Spent</div>
          <div className="text-2xl font-bold text-red-500">
            {formatRupee(spent)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="">
          <div className="text-gray-500 text-sm">Remaining</div>
          <div className="text-2xl font-bold text-green-600">
            {formatRupee(remaining)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
