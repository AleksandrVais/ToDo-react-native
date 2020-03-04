import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View, Keyboard } from "react-native";
import { THEME } from "../theme";
import {AntDesign} from "@expo/vector-icons";

export const AddToDo = ({ onSubmit, ...props }) => {
	const [value, setValue] = useState( "" );

	const onPressHandler = () => {
		if ( !!value.length ) {
			onSubmit( value );
			setValue( "" );
			Keyboard.dismiss()
		} else {
			Alert.alert( "Empty ToDo title" );
		}
	};
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={setValue}
				placeholder="Enter new ToDo..."
				autoCorrect={false}/>
			<AntDesign.Button name="pluscircleo" onPress={onPressHandler}>Add</AntDesign.Button>
			{/*<Button title={"Add"} onPress={onPressHandler}/>*/}
		</View>
	);
};

const styles = StyleSheet.create( {
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15
	},
	input: {
		width: "70%",
		padding: 10,
		borderStyle: "solid",
		borderBottomWidth: 2,
		borderBottomColor: THEME.MAIN_COLOR
	}
} );
