import { CHANGE_SCREEN } from "../types";

const handlers = {
	[CHANGE_SCREEN]: (state, payload) => payload,
	DEFAULT: state => state
};

export const screenReducer = (state, action) => {
	const { type, payload } = action;
	const handler = handlers[type] || handlers.DEFAULT;
	return handler( state, payload );
};
