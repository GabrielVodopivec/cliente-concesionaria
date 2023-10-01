export function datosObtenidosDel(elements) {
	let result = {};

	for (let i = 0; i < elements.length; i++) {
		const { name, value, type } = elements[i];
		if (type === 'submit') continue;
		result = {
			...result,
			[name]: value
		};
	}

	result.services = [
		{
			date: '2022-10-20',
			kilometers: 321321,
			descriptions: 'Mantenimiento de rutina'
		},
		{
			date: '2022-11-20',
			kilometers: 321654,
			descriptions: 'Otro mantenimiento'
		}
	];

	return result;
}
