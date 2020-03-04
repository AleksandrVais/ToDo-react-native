import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppTextBold } from "./ui/AppTextBold";

export const ToDoItem = ({ toDo, onRemove, onOpen, ...props }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={onOpen.bind( null, toDo.id )}
			onLongPress={onRemove.bind( null, toDo.id )}
		>
			<View style={styles.container}>
				<AppTextBold style={styles.title}>
					{toDo.title}
				</AppTextBold>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create( {
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderWidth: 1,
		borderColor: "#eee",
		borderRadius: 5,
		marginBottom: 10
	}
} );
