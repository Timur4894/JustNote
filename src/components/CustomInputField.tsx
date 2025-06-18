import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInputField = ({ placeholder, value, onChangeText, boxStyles = {} }: { placeholder: string, value: string, onChangeText: (text: string) => void, boxStyles: {} }) => {
  return (
      <TextInput style={[styles.input, boxStyles]} placeholderTextColor={'#ccc'} placeholder={placeholder} value={value} onChangeText={onChangeText} />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingHorizontal: 12,
    fontFamily: 'Nunito',
    color: '#fff',
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 18,
  },
});

export default CustomInputField;