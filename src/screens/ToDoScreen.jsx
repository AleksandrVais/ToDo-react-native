import React, { useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppButton } from "../components/ui/AppButton";
import { AppCard } from "../components/ui/AppCard";
import { AppTextBold } from "../components/ui/AppTextBold";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

export const ToDoScreen = () => {
	const [modal, setModal] = useState( false );
	const { todos, updateToDo, removeToDo } = useContext( TodoContext );
	const { todoId, changeScreen } = useContext( ScreenContext );

	const toDo = todos.find( todo => todo.id === todoId );

	const saveHandler = title => {
		setModal( false );
		updateToDo( toDo.id, title );
	};

	return (
		<View>
			<EditModal value={toDo.title} onSave={saveHandler} visible={modal} onCancel={() => setModal( false )}/>

			<AppCard style={styles.card}>
				<AppTextBold style={styles.title}>{toDo.title}</AppTextBold>
				<AppButton onPress={() => setModal( true )}><FontAwesome name='edit' size={20}/></AppButton>
			</AppCard>
			<View style={styles.buttons}>
				<View style={styles.button}>
					<AppButton color={THEME.GRAY_COLOR} onPress={() => changeScreen( null )}>
						<AntDesign name='back' size={20} color={"#fff"}/>
					</AppButton>
				</View>
				<View style={styles.button}>
					<AppButton color={THEME.DANGER_COLOR} onPress={() => removeToDo( toDo.id )}>
						<FontAwesome name="remove" size={20} color={"#fff"}/>
					</AppButton>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create( {
	buttons: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	button: {
		width: Dimensions.get( "window" ).width / 3
	},
	title: {
		fontSize: 20
	},
	card: {
		marginBottom: 20,
		padding: 15
	}
} );
