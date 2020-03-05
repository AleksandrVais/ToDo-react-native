import React, { useContext, useEffect, useState, useCallback } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { AddToDo } from "../components/AddToDo";
import { ToDoItem } from "../components/ToDoItem";
import { AppButton } from "../components/ui/AppButton";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";

export const MainScreen = () => {
	const { addToDo, removeToDo, todos, fetchTodos, loading, error } = useContext( TodoContext );
	const { changeScreen } = useContext( ScreenContext );

	const [deviceWidth, setDeviceWidth] = useState( Dimensions.get( "window" ).width - THEME.PADDING_HORIZONTAL * 2 );

	const loadToDos = useCallback( async () => await fetchTodos(), [fetchTodos] );

	useEffect( () => {
		loadToDos();
	}, [] );

	useEffect( () => {
		const update = () => {
			const width = Dimensions.get( "window" ).width - THEME.PADDING_HORIZONTAL * 2;
			setDeviceWidth( width );
		};
		Dimensions.addEventListener( "change", update );

		return () => Dimensions.removeEventListener( "change", update );
	}, [] );

	if(loading){
		return <AppLoader/>
	}

	if(error){
		return <View style={styles.center}><AppText style={styles.error}>{error}</AppText><AppButton onPress={loadToDos}>Try again</AppButton></View>
	}

	let content = ( <FlatList
		data={todos}
		renderItem={({ item }) => <ToDoItem toDo={item} onRemove={removeToDo} onOpen={changeScreen}/>}
		keyExtractor={item => item.id.toString()}
		style={{ width: deviceWidth }}
	/> );

	if (!todos.length ) {
		content = ( <View style={styles.imgWrap}>
			<Image style={styles.image} source={require( "../../assets/no-items.png" )} resizeMode='contain'/>
		</View> );
	}

	return (
		<View>
			<AddToDo onSubmit={addToDo}/>
			{content}
		</View>
	);
};

const styles = StyleSheet.create( {
	imgWrap: {
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		height: "85%"
	},
	image: {
		width: "100%",
		height: 300
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	error: {
		fontSize: 20,
		color: THEME.DANGER_COLOR
	}

} );
