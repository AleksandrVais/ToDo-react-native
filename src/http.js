export class Http {
	static HEADERS = { "Content-Type": "application/json" };

	static async get(url) {
		try {
			return await request( url, "GET" );
		} catch ( e ) {
			console.log( e );
		}
	}

	static async post(url, data = {}) {
		try {
			return await request( url, "POST", data );
		} catch ( e ) {
			console.log( e );
		}
	}

	static async delete(url) {
		try {
			return await request( url, "DELETE" );
		} catch ( e ) {
			console.log( e );
		}
	}

	static async patch(url, data = {}) {
		try {
			return await request( url, "PATCH", data );
		} catch ( e ) {
			console.log( e );
		}
	}
}

const request = async (url, method = "GET", data) => {
	const config = {
		method,
		headers: Http.HEADERS
	};

	if ( method === "POST" || method === "PATCH" ) {
		config.body = JSON.stringify( data );
	}

	const res = await fetch( url, config );
	console.log(res);

	return await res.json();
};
