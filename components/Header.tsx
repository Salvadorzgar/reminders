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
        marginBottom: 25,
    },
    header: {
        fontSize: height * 0.025,
        color: 'black',
        fontWeight: "bold",
    }
})

function some3(numeric) {
    
    if (numeric > 3999) {
        return "Number out of range";
    }

    const nums = [
        ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
        ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
        ['M', 'MM', 'MMM'],
    ]
    let i = 0;
    let romannum = '';
    for (const num in numeric.toString().split("").reverse()) {
        if (num !== '0') {
            console.log(nums[i][parseInt(num) - 1])
        }
        i++;
    }

    return romannum;
}