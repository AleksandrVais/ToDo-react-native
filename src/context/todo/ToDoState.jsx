import React, { useContext, useReducer } from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screen/screenContext";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";

export const ToDoState = ({ children, ...props }) => {
	const initialState = {
		todos: [{ id: "1", title: "Learn React Native" }]
	};

	const [state, dispatch] = useReducer( todoReducer, initialState );

	const { changeScreen } = useContext( ScreenContext );

	const addToDo = title => dispatch( { type: ADD_TODO, payload: title } );
	const removeToDo = id => {
		const todo = state.todos.find( t => t.id === id );

		Alert.alert(
			"Remove ToDo",
			`Do you want to remove "${todo.title}" ?`,
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Remove", onPress: () => {
						changeScreen( null );
						dispatch( { type: REMOVE_TODO, payload: id } );
					}
				}
			],
			{ cancelable: false }
		);

	};
	const updateToDo = (id, title) => dispatch( { type: UPDATE_TODO, payload: { title, id } } );

	return <TodoContext.Provider
		value={{ todos: state.todos, addToDo, removeToDo, updateToDo }}>{children}</TodoContext.Provider>;
};
