import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { AddToDo } from "../components/AddToDo";
import { ToDoItem } from "../components/ToDoItem";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";

export const MainScreen = () => {
	const { addToDo, removeToDo, todos } = useContext( TodoContext );
	const { changeScreen } = useContext( ScreenContext );

	const [deviceWidth, setDeviceWidth] = useState( Dimensions.get( "window" ).width - THEME.PADDING_HORIZONTAL * 2 );

	useEffect( () => {
		const update = () => {
			const width = Dimensions.get( "window" ).width - THEME.PADDING_HORIZONTAL * 2;
			setDeviceWidth( width );
		};
		Dimensions.addEventListener( "change", update );

		return () => Dimensions.removeEventListener( "change", update );
	}, [] );

	let content = ( <FlatList
		data={todos}
		renderItem={({ item }) => <ToDoItem toDo={item} onRemove={removeToDo} onOpen={changeScreen}/>}
		keyExtractor={item => item.id.toString()}
		style={{ width: deviceWidth }}
	/> );

	if ( !todos.length ) {
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
	}
} );
