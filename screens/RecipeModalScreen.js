import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PrepButton from "../components/PrepButton";
import Colors from "../constants/colors";

// Modal screen that slides up over the Recipes screen when the user
// presses "View" on a recipe. Shows the full title and recipe text.
// props:
//   visible - true when the modal should be showing
//   recipe  - the { id, title, text } object that was selected (or null)
//   onClose - hides the modal and returns to the Recipes screen
function RecipeModalScreen({ visible, recipe, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose} // Android back button closes the modal
    >
      <SafeAreaView style={styles.rootContainer}>
        {/* only render the contents once a recipe has been picked */}
        {recipe && (
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.kickerText}>Recipe</Text>
              <Text style={styles.titleText}>{recipe.title}</Text>
            </View>

            <ScrollView style={styles.textContainer}>
              <Text style={styles.recipeText}>{recipe.text}</Text>
            </ScrollView>
          </>
        )}

        <View style={styles.buttonContainer}>
          <PrepButton onPress={onClose}>Back to Recipes</PrepButton>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default RecipeModalScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.charcoal,
    paddingHorizontal: 20,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: Colors.teal,
    marginBottom: 16,
  },
  kickerText: {
    fontFamily: "Oswald_500Medium",
    fontSize: 13,
    letterSpacing: 3,
    color: Colors.bronze,
    textTransform: "uppercase",
  },
  titleText: {
    fontFamily: "Oswald_700Bold",
    fontSize: 32,
    lineHeight: 40,
    color: Colors.paper,
    textTransform: "uppercase",
  },
  textContainer: {
    flex: 1,
  },
  recipeText: {
    fontSize: 16,
    lineHeight: 25,
    color: Colors.paper,
  },
  buttonContainer: {
    paddingVertical: 12,
  },
});
