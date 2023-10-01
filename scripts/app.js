import { httpClient } from './services/httpClient/index.js';
import { Observer } from './utils/observador.js';
export const observer = new Observer(getAllVehicles);

let vehicleTable = document.getElementById('vehicleTable');
let servicesTable = document.getElementById('servicesTable');
let showVehicles = document.getElementById('showVehicles');

servicesTable.style.display = 'none';

const handleCloseButton = () => {
	servicesTable.style.display = 'none';
};

const showServices = (response) => {
	const { services, model } = response;

	const tBodyServices = document.createElement('tbody');
	tBodyServices.setAttribute('id', 'tBodyServices');

	for (let i = 0; i < services.length; i++) {
		const tr = document.createElement('tr');
		const service = services[i];
		for (const prop in service) {
			const td = document.createElement('td');
			td.innerText = service[prop];
			tr.append(td);
		}
		tBodyServices.append(tr);
	}

	let oldTBodyServices = document.getElementById('tBodyServices');
	if (oldTBodyServices) {
		oldTBodyServices.remove();
	}
	servicesTable.append(tBodyServices);
	servicesTable.style.display = 'block';

	let caption = servicesTable.createCaption();
	caption.innerText = `Servicios del ${model}`;

	const btn = document.createElement('button');
	btn.setAttribute('id', 'closeButton');
	btn.innerText = 'X';
	btn.addEventListener('click', handleCloseButton);

	caption.append(btn);
};

const elError = (err) => {
	console.log(err);
};

const hanldeViewDetail = (event) => {
	const { target } = event;
	const { id } = target;
	httpClient.getById(id).then(showServices).catch(elError);
};

const createdLinkTd = (id) => {
	const tdDetail = document.createElement('td');
	const link = document.createElement('button');
	link.setAttribute('id', id);
	link.setAttribute('class', 'btn-detail');
	link.innerText = 'Ver';
	tdDetail.append(link);
	return tdDetail;
};

async function getAllVehicles() {
	document.getElementById('tBodyVehicles').remove();

	const tBodyVehicles = document.createElement('tbody');
	tBodyVehicles.setAttribute('id', 'tBodyVehicles');

	try {
		let vehiclesList = await httpClient.getAllData('/');

		for (let i = 0; i < vehiclesList.length; i++) {
			const tr = document.createElement('tr');
			const vehicle = vehiclesList[i];
			for (let prop in vehicle) {
				const td = document.createElement('td');
				td.innerText = vehicle[prop];
				tr.append(td);
			}
			tr.append(createdLinkTd(vehicle.id));
			tBodyVehicles.append(tr);
		}
	} catch (e) {
		console.log(e);
	}

	vehicleTable.append(tBodyVehicles);
	vehicleTable.style.display = 'block';
	let btns = document.getElementsByClassName('btn-detail');
	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', hanldeViewDetail);
	}
}

showVehicles.onclick = getAllVehicles;
