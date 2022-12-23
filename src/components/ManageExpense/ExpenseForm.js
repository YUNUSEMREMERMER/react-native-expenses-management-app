import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { Formik } from "formik";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../../context/ExpensesReducer";

function ExpenseForm({ editedExpenseId, isEditing }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(editedExpenseId);

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(values) {
    if (isEditing) {
      dispatch(
        updateExpense({
          expense: {
            id: editedExpenseId,
            description: values.description,
            amount: values.amount,
            date: new Date(values.date),
          },
        })
      );
      navigation.goBack();
    } else {
      dispatch(
        addExpense({
          expense: {
            id: `e${Math.floor(Math.random() * 100)}`,
            description: values.description,
            amount: values.amount,
            date: new Date(values.date),
          },
        })
      );
      navigation.goBack();
    }
  }

  return (
    <Formik
      initialValues={{ amount: "", date: "", description: "" }}
      onSubmit={confirmHandler}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.form}>
          <Text style={styles.title}>Your Expense</Text>
          <View style={styles.rowInput}>
            <Input
              style={{ flex: 1 }}
              label="Amount"
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: handleChange("amount"),
                value: values.amount,
              }}
            />
            <Input
              style={{ flex: 1 }}
              label="Date"
              textInputConfig={{
                placeholder: "YYY-MM-DD",
                maxLength: 10,
                onChangeText: handleChange("date"),
                value: values.date,
              }}
            />
          </View>

          <Input
            label="Description"
            textInputConfig={{
              multiLine: true,
              onChangeText: handleChange("description"),
              value: values.description,
            }}
          />

          <View>
            <Button mode="flat" onPress={cancelHandler}>
              Cancel
            </Button>
            <Button onPress={handleSubmit}>
              {isEditing ? "Update" : "Add"}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
}
export default ExpenseForm;

const styles = StyleSheet.create({
  rowInput: {
    flexDirection: "row",
  },
  form: {
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 24,
  },
});
