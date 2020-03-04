import { AppLoading } from "expo";
import * as Font from "expo-font";
import React, { useState } from "react";
import { ScreenState } from "./src/context/screen/ScreenState";
import { ToDoState } from "./src/context/todo/ToDoState";
import { MainLayout } from "./src/MainLayout";

const loadApplication = async () => {
	console.log( "loading" );
	await Font.loadAsync( {
		"roboto-regular": require( "./assets/fonts/Roboto-Regular.ttf" ),
		"roboto-bold": require( "./assets/fonts/Roboto-Bold.ttf" ),
		"montherat": require( "./assets/fonts/Montserrat-Regular.ttf" )
	} );
};

export default function App() {
	const [isReady, setIsReady] = useState( false );

	if ( !isReady ) {
		return <AppLoading startAsync={loadApplication} onError={console.error}
		                   onFinish={setIsReady.bind( null, true )}/>;
	}

	return (
		<ScreenState>
			<ToDoState>
				<MainLayout/>
			</ToDoState>
		</ScreenState>
	);
}

