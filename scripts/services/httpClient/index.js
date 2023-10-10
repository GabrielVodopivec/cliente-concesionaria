import { baseURL } from "../config/appconfig.js";

class HttpClient {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	async getAllData(path) {
		const request = new Request(`${this.baseURL}${path}`);
		// const response = await fetch("../../fakeData/data.json");
		const response = await fetch(request);
		return response.json();
	}

	async getById(id) {
		const request = new Request(`${this.baseURL}/${id}`);
		const response = await fetch(request);
		return response.json();
	}

	async postData(requestConfig) {
		const { url, ...options } = requestConfig;
		const request = new Request(`${this.baseURL}/${url}`, options);
		const response = await fetch(request);
		return response;
	}

	async delete(id) {
		const options = {
			method: "DELETE"
		};
		const request = new Request(`${this.baseURL}/${id}`, options);
		const response = await fetch(request);
		const json = await response.json();
		return json;
	}
}

export const httpClient = new HttpClient(baseURL);
