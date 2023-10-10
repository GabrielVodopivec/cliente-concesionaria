const createdLinkDescription = (id, method, label) => {
	const tdDetail = document.createElement("td");
	const link = document.createElement("button");
	link.setAttribute("id", `${method}-${id}`);
	link.setAttribute("class", "btn-detail");
	link.innerText = label;
	tdDetail.append(link);
	return tdDetail;
};

function formatedDate(date, format) {
	let dateToFormat = new Date(date);
	let day = dateToFormat.getUTCDate();
	let month = dateToFormat.getUTCMonth() + 1;
	let year = dateToFormat.getFullYear();
	let formatedDate;

	switch (format) {
		case "dd-MM-yyyy":
			formatedDate = `${day} - ${month} - ${year}`;
			break;
		case "dd/MM/yyyy":
			formatedDate = `${day} / ${month} / ${year}`;
			break;
		default:
			formatedDate = `${day} / ${month} / ${year}`;
	}

	return formatedDate;
}

export const appendBodyRows = (elementInterface, elementsList, tBody, links = []) => {
	for (let i = 0; i < elementsList.length; i++) {
		const tr = document.createElement("tr");
		const element = elementsList[i];

		for (const description of elementInterface) {
			const td = document.createElement("td");
			if (description === "date" || description === "manufacturingDate") {
				td.innerText = formatedDate(element[description]);
			} else {
				td.innerText = element[description];
			}
			tr.append(td);
		}

		if (links.length) {
			for (const link of links) {
				const { method, label } = link;
				tr.append(createdLinkDescription(element.id, method, label));
			}
		}

		tBody.append(tr);
	}
};

export const appendCloseBtn = ({ container, id, text, callback }) => {
	const btn = document.createElement("button");
	btn.setAttribute("id", id);
	btn.innerHTML = text;
	btn.addEventListener("click", callback);
	container.append(btn);
};
