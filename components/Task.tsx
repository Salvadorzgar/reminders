import { Colors } from "@/constants/Colors";
import { completeTask } from "@/sqlitedb";
import { formatDate } from "@/utils";
import useTaskStore, { Task as TaskType } from "@/zustand/store";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const { height, width } = Dimensions.get('screen');

export function Task({ task }: { task: TaskType }) {
    const { setTriggerUpdate } = useTaskStore((state) => state);

    const offset = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onChange((event) => {
            if (event.translationX < 0 && event.translationX > (width * 0.20 * -1)) {
                offset.value = event.translationX;
            }
        })
        .onFinalize((event) => {
            if (event.translationX < (width * 0.20 * -1)) {
                offset.value = width * 0.20 * -1
            } else {
                offset.value = withTiming(0)
            }
        }).activeOffsetX([-10, 10]);

    const offsetAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value }],
        };
    });

    const handleCompleteStatus = async () => {
        try {
            await completeTask(task.id, false, !task.completed);
            setTriggerUpdate()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <GestureDetector gesture={panGesture} >
            <View style={styles.container}>
                <>
                    <Animated.View style={[offsetAnimation, styles.animatedContainer]}>
                        <Text style={styles.text}>{task.task}</Text>
                        <Text>{`Added on ${formatDate(new Date(task.createdAt))}`}</Text>
                    </Animated.View>

                    <Pressable style={styles.backview} onPress={handleCompleteStatus}>
                        <Text>{task.completed ? 'To do' : 'Complete'}</Text>
                    </Pressable>
                </>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        paddingHorizontal: 20,
        paddingVertical: 8,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedContainer: {
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'white',
        alignSelf: 'stretch',
    },
    text: {
        fontSize: height * 0.020,
        color: '#444444',
        fontWeight: '400'
    },
    backview: {
        position: 'absolute',
        backgroundColor: Colors.backgroundBlue,
        height: '100%',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 4,
        zIndex: 0,
    }
});