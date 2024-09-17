import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../utils/date-utils';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({ submitButtonLabel, defaultValues, onSubmit, onCancel }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  function inputChangeHandler(name, value) {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: {
          value,
          isValid: true,
        },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: parseFloat(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevInputs) => ({
        amount: { value: prevInputs.amount.value, isValid: amountIsValid },
        date: { value: prevInputs.date.value, isValid: dateIsValid },
        description: {
          value: prevInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.row}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          keyboardType="decimal-pad"
          value={inputs.amount.value}
          onChangeText={inputChangeHandler.bind(this, 'amount')}
          expanded
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          invalid={!inputs.date.isValid}
          value={inputs.date.value}
          onChangeText={inputChangeHandler.bind(this, 'date')}
          expanded
        />
      </View>
      <Input
        label="Description"
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        invalid={!inputs.description.isValid}
        value={inputs.description.value}
        onChangeText={inputChangeHandler.bind(this, 'description')}
      />
      {formIsInValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});
