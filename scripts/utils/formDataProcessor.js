let addServiceBtn = document.getElementById("addService-btn");
let vehicleForm = document.getElementById("vehicleForm");

export let serviceInfo = [];
export let serviceData = {};
export let updatedResult = {};

const addValue = (result, name, value) => {
	const names = { descriptions, date, kilometers };
	if (name in names) {
		serviceData = {
			...serviceData,
			[name]: value
		};
	} else {
		updatedResult = {
			...result,
			[name]: value
		};
	}

	updatedResult.services = [...serviceInfo, serviceData];
	return updatedResult;
};

const handleClickServiceBtn = ({ date, kilometers, descriptions }) => {
	serviceInfo = [
		...serviceInfo,
		{
			date,
			kilometers,
			descriptions
		}
	];
};

addServiceBtn.onclick = () => {
	let {
		elements: { kilometers, descriptions, date }
	} = vehicleForm;
	handleClickServiceBtn({
		kilometers: kilometers.value,
		descriptions: descriptions.value,
		date: date.value
	});
};

export function datosObtenidosDel(elements) {
	let result = {};
	for (let i = 0; i < elements.length; i++) {
		const { name, value, type } = elements[i];
		switch (type) {
			case "submit":
				break;
			case "radio":
				if (elements[i].checked) result = addValue(result, name, value);
				break;
			default:
				result = addValue(result, name, value);
		}
	}

	return result;
}
