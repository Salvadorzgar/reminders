import { Colors } from "@/constants/Colors";
import { createTask } from "@/sqlitedb";
import useTaskStore from "@/zustand/store";
import { useState } from "react";
import {
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput
} from "react-native";

const { height, width } = Dimensions.get("screen");

export function TaskInput() {
    const [task, setTask] = useState("");
    const [adding, setAdding] = useState(false);
    const { setTriggerUpdate } = useTaskStore((state) => state);

    function handleChangeText(text: string) {
        setTask(text);
    }

    async function addNewTask() {
        setAdding(true);
        const success = await createTask(task.substring(0, 1).toUpperCase().concat(task.substring(1)), "", false);

        if (success) {
            setTask("");
            setTriggerUpdate();
        }

        setAdding(false);
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={task}
                onChangeText={handleChangeText}
                placeholder="I want to..."
                style={styles.textinput}
            />

            <Pressable style={styles.addButton} onPress={addNewTask}>
                <Text style={styles.addButtonText}>+</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        flexDirection: "row",
        height: height * 0.06,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        // columnGap: 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'gray',
        paddingHorizontal: 10
    },
    textinput: {
        width: width * 0.85,
        borderRadius: 99,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'gray',
        height: '100%',
        paddingHorizontal: 20
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mainColor,
        borderRadius: 99,
        width: width * 0.085,
        height: width * 0.085,
    },
    addButtonText: {
        color: 'white',
        fontSize: 21,
    },
})