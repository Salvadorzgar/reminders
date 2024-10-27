import {
    Dimensions,
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Header } from "@/components/Header";
import { Task } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { useEffect, useRef } from "react";
import { getTasks } from "@/sqlitedb";
import useTaskStore, { Task as TaskType } from "@/zustand/store";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function Home() {
    const { setTasks, todoTasks, triggerUpdate } = useTaskStore((state) => state);

    useEffect(() => {
        const loadTasks = async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        }

        loadTasks();
    }, [triggerUpdate])

    const renderItem: ListRenderItem<TaskType> = ({ item }) => {
        return (
            <Task key={item.id} task={item} />
        );
    };

    return (
        <View style={styles.mainView}>
            <Header header="Tasks" />
            <GestureDetector gesture={Gesture.Manual()}>
                <FlatList
                    data={todoTasks}
                    renderItem={renderItem}
                    style={{ flex: 1 }}
                />
            </GestureDetector>
            <TaskInput />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white',
    }
})