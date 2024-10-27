import { Header } from "@/components/Header";
import { Task } from "@/components/Task";
import useTaskStore, { Task as TaskType } from "@/zustand/store";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";

export default function Completed() {
    const { completedTasks } = useTaskStore((state) => state);

    const renderItems: ListRenderItem<TaskType> = ({ index, item }) => {
        return (
            <Task task={item} key={item.id} />
        )
    }
    
    return (
        <View style={styles.mainView}>
            <Header header="Completed" />
            <FlatList
                data={completedTasks}
                renderItem={renderItems}
                style={styles.list}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        flex: 1,
    }
})