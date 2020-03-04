import React from "react";
import { StyleSheet, View } from "react-native";

export const AppCard = props => {
	return (
		<View style={{...props.style,...styles.default}}>
			{props.children}
		</View>
	);
};

const styles = StyleSheet.create( {
	default: {
		flexDirection: "row",
		padding: 20,
		justifyContent: "space-between",
		alignItems: "center",
		shadowColor: '#000',
		shadowRadius: 2,
		shadowOpacity: 0.3,
		shadowOffset: {width: 2, height: 2},
		backgroundColor: "#fff",
		borderRadius: 10,
		// android
		elevation: 8
	}
} );
