import { httpClient } from "./services/httpClient/index.js";
import { Observer } from "./utils/observador.js";
import { appendBodyRows, appendCloseBtn } from "./utils/tableHelpers.js";
import { serviceInterface, vehicleInterface } from "./utils/interfaces.js";
export const postObserver = new Observer(getAllVehicles);

let vehicleTable = document.getElementById("vehicleTable");
let servicesTable = document.getElementById("servicesTable");
let showVehicles = document.getElementById("showVehicles");

servicesTable.style.display = "none";

function handleCloseButton() {
	servicesTable.style.display = "none";
};

const showServices = ({ result }) => {
	const { services, model } = result;
	const oldTBodyServices = document.getElementById("tBodyServices");

	const tBodyServices = document.createElement("tbody")
	tBodyServices.setAttribute("id", "tBodyServices");

	appendBodyRows(serviceInterface, services, tBodyServices);

	oldTBodyServices
		? oldTBodyServices.replaceWith(tBodyServices)
		: servicesTable.append(tBodyServices);

	let caption = servicesTable.createCaption();
	caption.innerText = `Servicios del ${model}`;

	const closeButtonConfig = {
		container: caption,
		id: "closeBtton",
		text: "&#x2716",
		callback: handleCloseButton
	}
	appendCloseBtn(closeButtonConfig);

	servicesTable.style.display = "block";
};

function theError(err) {
	console.log(err);
};

function handleClick(event) {
	const { target } = event;
	const { id } = target;
	const [method, vehicleId] = id.split("-");

	const doSomething = () => {
		handleCloseButton();
		getAllVehicles();
	};

	switch (method) {
		case "GET":
			httpClient.getById(vehicleId).then(showServices).catch(theError);
			break;
		case "DELETE":
			httpClient.delete(vehicleId).then(doSomething).catch(theError);
			break;
		default:
			return;
	}
};

async function getAllVehicles() {
	const oldTbodyVehicles = document.getElementById("tBodyVehicles");
	const tBodyVehicles = document.createElement("tbody");
	tBodyVehicles.setAttribute("id", "tBodyVehicles");

	const links = [{ method: "GET", label: "ver" }, { method: "DELETE", label: "eliminar" }];

	try {
		let { result: vehiclesList } = await httpClient.getAllData("/");
		appendBodyRows(vehicleInterface, vehiclesList, tBodyVehicles, links);
	} catch (e) {
		console.log(e);
	}

	if (oldTbodyVehicles) {
		oldTbodyVehicles.replaceWith(tBodyVehicles);
	} else {
		vehicleTable.append(tBodyVehicles);
	}

	let btns = document.getElementsByClassName("btn-detail");
	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", handleClick);
	}
}

showVehicles.onclick = getAllVehicles;
