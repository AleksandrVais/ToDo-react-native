import React, { useState } from "react";
import { Alert, Modal, StyleSheet, TextInput, View } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ value, onSave, visible, onCancel, ...props }) => {

	const [title, setTitle] = useState( value );

	const saveHandler = () => {
		if ( title.trim().length < 3 ) {
			Alert.alert( "Error!", `Minimal length is 3 character. Now ${title.trim().length}` );
		} else {
			onSave( title );
		}
	};

	const handlerCancel = () => {
		setTitle( value );
		onCancel();
	};

	return (
		<Modal visible={visible} animationType="slide">
			<View style={styles.wrapper}>
				<TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder="Enter ToDo"
				           autoCorrent={false}/>
				<View style={styles.buttons}>
					<AppButton onPress={handlerCancel} color={THEME.DANGER_COLOR}>
						Cancel
					</AppButton>
					<AppButton onPress={saveHandler}>
						Save
					</AppButton>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create( {
	wrapper: {

		justifyContent: "center",
		alignItems: "center",
		flex: 1
	},
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 2,
		width: "80%"
	},
	buttons: {
		width: "100%",
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-around"
	}
} );
