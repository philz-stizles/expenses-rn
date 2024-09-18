import { useState, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useExpenses } from '../store/context/expenses.context';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { storeExpense, updateExpense, deleteExpense } from '../utils/http.util';

function ManageExpense({ route, navigation }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();
  const {
    expenses,
    addExpense,
    updateExpense: updateStoreExpense,
    deleteExpense: deleteStoreExpense,
  } = useExpenses();
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const selectedExpense = isEditing
    ? expenses.find((expense) => expense.id === expenseId)
    : null;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsPending(true);
    try {
      deleteStoreExpense(expenseId);
      await deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - Please try again later!');
      setIsPending(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(data) {
    setIsPending(true);
    try {
      if (isEditing) {
        // updateExpense(expenseId, data);
        updateStoreExpense(expenseId, data);
        await updateExpense(expenseId, data);
      } else {
        // addExpense(data);
        const id = await storeExpense(data);
        addExpense({ ...data, id });
      }

      navigation.goBack();
    } catch (error) {
      setError('Could not save data - Please try again later!');
      setIsPending(false);
    }
  }

  if (error && !isPending) {
    return <ErrorOverlay message={error} />;
  }

  if (isPending) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
