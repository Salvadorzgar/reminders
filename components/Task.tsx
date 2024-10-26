import { formatDate } from "@/utils";
import { Task as TaskType } from "@/zustand/store";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector, TouchableHighlight } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const { height, width } = Dimensions.get('screen');

export function Task({ task }: { task: TaskType }) {
    const rippleOpacity = useSharedValue(0);
    const rippleScale = useSharedValue(0);

    const rippleGesture = Gesture.Tap().onStart(() => {
        // Reset values and animate ripple
        rippleOpacity.value = withTiming(1, { duration: 300 });
        rippleScale.value = withTiming(3, { duration: 300 }, () => {
        // Fade out ripple after it completes expanding
        rippleOpacity.value = withTiming(0, { duration: 300 });
        rippleScale.value = withTiming(0, { duration: 300 });
        });
    });

    // Animated style for ripple effect
    const rippleStyle = useAnimatedStyle(() => {
        return {
        opacity: rippleOpacity.value,
        transform: [{ scale: rippleScale.value }],
        };
    });

    return (
        <GestureDetector gesture={rippleGesture}>
            <TouchableHighlight style={styles.container}>
                <>
                    <Text style={styles.text}>{task.task}</Text>
                    <Text>{`Added on ${formatDate(new Date(task.createdAt))}`}</Text>
                    <Animated.View style={[ styles.ripple, rippleStyle ]} />
                </>
            </TouchableHighlight>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        paddingHorizontal: 20,
        // marginBottom: 15,
        paddingVertical: 8,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: height * 0.020,
        color: '#444444',
        fontWeight: '400'
    },
    ripple: {
        position: 'absolute',
        width: 150,  // Same width as the button
        height: 150, // Same height as the button (or more, if you want ripple overflow)
        borderRadius: 99,
        backgroundColor: 'blue',
    },
});