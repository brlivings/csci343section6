import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PrepButton from "../components/PrepButton";
import Colors from "../constants/colors";

// Home screen - the first thing the user sees.
// Shows the app title, a stock photo of meal prep containers and a
// button that takes the user to the Recipes screen.
// props:
//   onGoToRecipes - function from App.js that switches to the Recipes screen
//   recipeCount   - how many recipes are saved (shown under the photo)
function HomeScreen({ onGoToRecipes, recipeCount }) {
  // safe area padding so nothing hides behind the notch / home bar
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.rootContainer,
        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 20 },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.kickerText}>B. Livingston  /  CCU</Text>
        <Text style={styles.titleText}>Prep Book</Text>
        <View style={styles.titleRule} />
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/meal-prep.png")}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.countText}>
        {recipeCount} {recipeCount === 1 ? "recipe" : "recipes"} saved
      </Text>

      <View style={styles.buttonContainer}>
        <PrepButton onPress={onGoToRecipes}>View Recipes</PrepButton>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.charcoal,
    paddingHorizontal: 24,
  },
  titleContainer: {
    marginBottom: 24,
  },
  kickerText: {
    fontFamily: "Oswald_500Medium",
    fontSize: 14,
    letterSpacing: 3,
    color: Colors.bronze,
    textTransform: "uppercase",
  },
  titleText: {
    fontFamily: "Oswald_700Bold",
    fontSize: 58,
    lineHeight: 66,
    color: Colors.paper,
    textTransform: "uppercase",
  },
  titleRule: {
    width: 64,
    height: 5,
    backgroundColor: Colors.teal,
    marginTop: 4,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.slate,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  countText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.muted,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
