import { StyleSheet, Touchable, TouchableOpacity, Text } from "react-native"

const CustomButton = ({placeholder, onPress} :  { placeholder: string, onPress: any }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text>{placeholder}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default CustomButton;