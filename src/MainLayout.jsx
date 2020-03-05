import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Navbar } from "./components/Navbar";
import { ScreenContext } from "./context/screen/screenContext";
import { MainScreen } from "./screens/MainScreen";
import { ToDoScreen } from "./screens/ToDoScreen";
import { THEME } from "./theme";

export const MainLayout = () => {
	const { todoId } = useContext( ScreenContext );

	return ( <View style={styles.wrapper}>
		<Navbar title="ToDo App"/>
		<View style={styles.container}>
			{todoId ? <ToDoScreen/> : <MainScreen/>}
		</View>
	</View> );
};

const styles = StyleSheet.create( {
	container: {
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		paddingVertical: 20,
		flex: 1
	},
	wrapper: {
		flex: 1
	}
} );
