import { useState, useEffect } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpenses } from '../store/context/expenses-context';
import { getDateMinusDays } from '../utils/date-utils';
import { getExpenses } from '../utils/http-util';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const { expenses, setExpenses } = useExpenses();

  console.log(expenses);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    console.log(expense.date, date7DaysAgo, today)

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  console.log(recentExpenses);

  useEffect(() => {
    async function loadExpenses() {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        setExpenses(expenses);
      } catch (error) {
        console.log(error);
        setError('Could not fetch expenses!');
      }

      setIsFetching(false);
    }

    loadExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
