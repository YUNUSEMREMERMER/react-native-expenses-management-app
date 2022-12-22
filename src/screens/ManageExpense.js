import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constans/styles";
import { removeExpense, addExpense } from "../context/ExpensesReducer";

function ManageExpense({ route, navigation }) {
  const dispatch = useDispatch();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    dispatch(removeExpense({ id: editedExpenseId }));
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    if (isEditing) {
      return;
    } else {
      dispatch(
        addExpense({
          expense: {
            id: "e10",
            description: "A pair of shoes",
            amount: 59.99,
            date: new Date("2022-12-20"),
          },
        })
      );
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Button mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
      </View>
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
    alignItems: "center",
  },
});
