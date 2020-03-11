import React, { useContext, useReducer } from "react";
import { Alert } from "react-native";
import { Http } from "../../http";
import { ScreenContext } from "../screen/screenContext";
import {
	ADD_TODO,
	CLEAR_ERROR,
	FETCH_TODOS,
	HIDE_LOADER,
	REMOVE_TODO,
	SHOW_ERROR,
	SHOW_LOADER,
	UPDATE_TODO
} from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";

export const ToDoState = ({ children, ...props }) => {
	const initialState = {
		todos: [],
		loading: false,
		error: null
	};

	const [state, dispatch] = useReducer( todoReducer, initialState );
	const { changeScreen } = useContext( ScreenContext );

	const fetchTodos = async () => {
		showLoader();
		clearError();
		try {
			const data = await Http.get( `https://reactnative-todo-90e7d.firebaseio.com/todos.json` );
			let todos;
			if(!!data){
				todos = Object.keys( data ).map( key => ( { ...data[key], id: key } ) );
			} else {
				todos = []
			}

			dispatch( { type: FETCH_TODOS, payload: todos } );
		} catch ( e ) {
			showError( "Something was wrong." );
			console.log( e );
		} finally {
			hideLoader();
		}
	};

	const addToDo = async title => {
		const data = await Http.post( `https://reactnative-todo-90e7d.firebaseio.com/todos.json`, { title } );
		dispatch( { type: ADD_TODO, payload: { id: data, title } } );
	};
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
					text: "Remove", onPress: async () => {
						changeScreen( null );
						await Http.delete( `https://reactnative-todo-90e7d.firebaseio.com/todos/${id}.json` );
						dispatch( { type: REMOVE_TODO, payload: id } );
					}
				}
			],
			{ cancelable: false }
		);

	};
	const updateToDo = async (id, title) => {
		try {
			await Http.patch( `https://reactnative-todo-90e7d.firebaseio.com/todos/${id}.json`, { title } );
			dispatch( { type: UPDATE_TODO, payload: { title, id } } );
		} catch ( e ) {
			console.log( e );
		}
	};

	// FETCH
	const showLoader = () => dispatch( { type: SHOW_LOADER } );
	const hideLoader = () => dispatch( { type: HIDE_LOADER } );
	const showError = error => dispatch( { type: SHOW_ERROR, payload: error } );
	const clearError = () => dispatch( { type: CLEAR_ERROR } );

	return <TodoContext.Provider
		value={{
			todos: state.todos,
			loading: state.loading,
			fetchTodos,
			error: state.error,
			addToDo,
			removeToDo,
			updateToDo
		}}>{children}</TodoContext.Provider>;
};
