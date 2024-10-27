import { View, Text, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

export function Header({ header }: { header: string }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{header}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "center",
        height: height * 0.05,
    },
    header: {
        fontSize: height * 0.025,
        color: 'black',
        fontWeight: "bold",
    }
})