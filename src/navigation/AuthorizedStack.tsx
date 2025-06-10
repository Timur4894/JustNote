import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotesScreen from "../screens/NotesScreen";

type RootStackParamList = {
    Notes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const UnauthorizedStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Notes" component={NotesScreen} />
    </Stack.Navigator>
  );
};

export default UnauthorizedStack;