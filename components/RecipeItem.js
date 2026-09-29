import { StyleSheet, Text, View } from "react-native";

import PrepButton from "./PrepButton";
import Colors from "../constants/colors";

// One row in the FlatList on the Recipes screen.
// Shows the recipe number + title on the left and the View / Delete
// buttons on the right, all laid out in a single row.
// props:
//   recipeNumber - position in the list (1, 2, 3...) shown as "#01"
//   title        - the recipe title
//   onView       - called when the View button is pressed
//   onDelete     - called when the Delete button is pressed
function RecipeItem({ recipeNumber, title, onView, onDelete }) {
  // pad single digits so the numbers line up like a meal prep log ("#01")
  const paddedNumber = String(recipeNumber).padStart(2, "0");

  return (
    <View style={styles.itemContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.numberText}>#{paddedNumber}</Text>
        <Text style={styles.titleText} numberOfLines={2}>
          {title}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <PrepButton small onPress={onView}>
          View
        </PrepButton>
        <PrepButton small variant="danger" onPress={onDelete}>
          Delete
        </PrepButton>
      </View>
    </View>
  );
}

export default RecipeItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: Colors.bronze,
    borderRadius: 3,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 6,
  },
  numberText: {
    fontFamily: "Oswald_500Medium",
    fontSize: 12,
    color: Colors.bronze,
    letterSpacing: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.charcoal,
  },
  buttonRow: {
    flexDirection: "row",
  },
});
