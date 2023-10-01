import { observer } from './app.js';
import { httpClient } from './services/httpClient/index.js';
import { Observable } from './utils/observador.js';
import { datosObtenidosDel } from './utils/formDataProcessor.js';

let vehicleForm = document.getElementById('vehicleForm');

const observable = new Observable();
observable.suscribe(observer);

function getRequestConfig(event) {
	const { target } = event;
	const { elements: vehicle } = target;
	const json = JSON.stringify(datosObtenidosDel(vehicle));
	const requestConfig = {
		url: '',
		method: 'POST',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
		body: json
	};

	return { requestConfig };
}

const handleSubmit = async (event) => {
	event.preventDefault();

	const { requestConfig } = getRequestConfig(event);
	const response = await httpClient.postData(requestConfig);

	if (response.ok) {
		observable.notify();
	} else {
		const errorJson = await response.json();
		console.log('Error: ', errorJson);
	}
};

vehicleForm.onsubmit = handleSubmit;
