import { createStackNavigator } from "@react-navigation/stack";
import MainStackNavigator from "./MainStackNavigator";

export default function Navigator() {
  return <RootNavigator />;
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" component={MainStackNavigator} />
    </Stack.Navigator>
  );
}
