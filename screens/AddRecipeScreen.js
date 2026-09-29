import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PrepButton from "../components/PrepButton";
import Colors from "../constants/colors";

// Add Recipe screen - two inputs (title + recipe text) and Save / Cancel.
// The typed values are kept in local state here until Save is pressed,
// then handed up to App.js which adds the recipe to the main list.
// props:
//   onSaveRecipe - function(title, text) from App.js that adds the recipe
//   onCancel     - goes back to the Recipes screen without saving
function AddRecipeScreen({ onSaveRecipe, onCancel }) {
  const insets = useSafeAreaInsets();

  // what the user has typed so far
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredText, setEnteredText] = useState("");
  // message shown under the inputs if something is missing
  const [errorMessage, setErrorMessage] = useState("");

  function titleChangeHandler(inputText) {
    setEnteredTitle(inputText);
    setErrorMessage("");
  }

  function textChangeHandler(inputText) {
    setEnteredText(inputText);
    setErrorMessage("");
  }

  // make sure both fields have something in them before saving
  function saveHandler() {
    const trimmedTitle = enteredTitle.trim();
    const trimmedText = enteredText.trim();

    if (trimmedTitle.length === 0 || trimmedText.length === 0) {
      setErrorMessage("Add a title and the recipe before saving.");
      return;
    }

    onSaveRecipe(trimmedTitle, trimmedText);
  }

  return (
    <KeyboardAvoidingView
      style={styles.rootContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>New Recipe</Text>
        </View>

        <Text style={styles.labelText}>Recipe Title</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="e.g. Cajun Chicken & Rice"
          placeholderTextColor={Colors.muted}
          value={enteredTitle}
          onChangeText={titleChangeHandler}
          maxLength={40}
        />

        <Text style={styles.labelText}>Recipe</Text>
        <TextInput
          style={styles.textInput}
          placeholder={"Ingredients, portions, macros, steps..."}
          placeholderTextColor={Colors.muted}
          value={enteredText}
          onChangeText={textChangeHandler}
          multiline={true}
          textAlignVertical="top"
        />

        {errorMessage !== "" && <Text style={styles.errorText}>{errorMessage}</Text>}

        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            <PrepButton variant="secondary" onPress={onCancel}>
              Cancel
            </PrepButton>
          </View>
          <View style={styles.buttonWrapper}>
            <PrepButton onPress={saveHandler}>Save</PrepButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AddRecipeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.paper,
  },
  scrollContent: {
    paddingHorizontal: 18,
  },
  headerContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.charcoal,
    paddingBottom: 8,
    marginBottom: 18,
  },
  headerText: {
    fontFamily: "Oswald_700Bold",
    fontSize: 38,
    color: Colors.charcoal,
    textTransform: "uppercase",
  },
  labelText: {
    fontFamily: "Oswald_500Medium",
    fontSize: 14,
    letterSpacing: 1.5,
    color: Colors.bronze,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  titleInput: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.charcoal,
    borderRadius: 3,
    padding: 12,
    fontSize: 17,
    color: Colors.charcoal,
    marginBottom: 18,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.charcoal,
    borderRadius: 3,
    padding: 12,
    fontSize: 16,
    color: Colors.charcoal,
    minHeight: 220,
  },
  errorText: {
    marginTop: 10,
    color: Colors.danger,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
});
