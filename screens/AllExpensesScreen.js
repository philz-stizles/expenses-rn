import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpenses } from '../store/context/expenses.context';

function AllExpenses() {
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      expenses={expenses}
      period="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
