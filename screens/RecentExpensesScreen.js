import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpenses } from '../store/context/expenses-context';
import { getDateMinusDays } from '../utils/date-utils';

function RecentExpenses() {
  const { expenses } = useExpenses();

 const recentExpenses = expenses.filter((expense) => {
   const today = new Date();
   const date7DaysAgo = getDateMinusDays(today, 7);

   return expense.date >= date7DaysAgo && expense.date <= today;
 });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
