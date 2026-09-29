import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PrepButton from "../components/PrepButton";
import RecipeItem from "../components/RecipeItem";
import Colors from "../constants/colors";

// Recipes screen - lists every saved recipe in a FlatList.
// The list itself lives in App.js; this screen only displays it and
// reports button presses back up through the functions it receives.
// props:
//   recipes       - array of { id, title, text } objects from App.js
//   onViewRecipe  - opens the modal for the recipe with the given id
//   onDeleteRecipe- removes the recipe with the given id from state
//   onAddRecipe   - switches to the Add Recipe screen
//   onGoHome      - switches back to the Home screen
function RecipesScreen({ recipes, onViewRecipe, onDeleteRecipe, onAddRecipe, onGoHome }) {
  const insets = useSafeAreaInsets();

  // builds one RecipeItem for each recipe in the FlatList
  function renderRecipeItem(itemData) {
    return (
      <RecipeItem
        recipeNumber={itemData.index + 1}
        title={itemData.item.title}
        onView={() => onViewRecipe(itemData.item.id)}
        onDelete={() => onDeleteRecipe(itemData.item.id)}
      />
    );
  }

  return (
    <View
      style={[
        styles.rootContainer,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 12 },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Recipes</Text>
        <Text style={styles.subHeaderText}>
          {recipes.length} in the rotation
        </Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={renderRecipeItem}
          // shown when every recipe has been deleted
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No recipes yet. Tap "Add Recipe" to log your first prep.
            </Text>
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <PrepButton onPress={onAddRecipe}>Add Recipe</PrepButton>
        <PrepButton variant="secondary" onPress={onGoHome}>
          Home
        </PrepButton>
      </View>
    </View>
  );
}

export default RecipesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.paper,
    paddingHorizontal: 18,
  },
  headerContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.charcoal,
    paddingBottom: 8,
    marginBottom: 14,
  },
  headerText: {
    fontFamily: "Oswald_700Bold",
    fontSize: 38,
    color: Colors.charcoal,
    textTransform: "uppercase",
  },
  subHeaderText: {
    fontSize: 14,
    color: Colors.muted,
  },
  listContainer: {
    flex: 1,
  },
  emptyText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 15,
    color: Colors.muted,
  },
  buttonContainer: {
    paddingTop: 8,
  },
});
