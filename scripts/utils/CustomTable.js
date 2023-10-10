export class CustomTable {
	constructor(idTable) {
		this.table = document.createElement("table");
		this.table.setAttribute("id", idTable);
		this.head = new TableHead("tHeadServices");
		this.body = new TableBody("tBodyServices");
	}

	setClass(name) {
		this.table.className = name;
	}

	addClassToList(name) {
		this.table.classList.add(name);
	}

	appendSomething({ element }) {
		this.table.append(element);
	}

	appendHeadAndBody(tHead, tBody) {
		const { element: head } = tHead;
		const { element: body } = tBody;

		this.table.append(head);
		this.table.append(body);
	}

	populateHead(data) {
		const trHead = new TableRow();

		for (const prop in data[0]) {
			const th = new TableHeader();
			th.addText(prop);
			trHead.appendElement(th);
		}
		this.head.appendElement(trHead);

		this.appendSomething(this.head);
	}

	populateBody(data) {
		for (let i = 0; i < data.length; i++) {
			const element = data[i];
			const tr = new TableRow();
			for (const prop in element) {
				const td = new TableDescription();
				td.addText(element[prop]);
				tr.appendElement(td);
			}
			this.body.appendElement(tr);
		}

		this.appendSomething(this.body);
	}

	populate(data) {
		this.populateHead(data);
		this.populateBody(data);
		return this;
	}

	addLinkButton(thText, tdText) {
		const bodyElements = this.body.element.children;
		const headElements = this.head.element.children;
		const th = new TableHeader();
		th.addText(thText);

		headElements[0].append(th.element);

		for (let i = 0; i < bodyElements.length; i++) {
			const button = new LinkButton("button");
			const description = new TableDescription();

			button.addText(tdText);
			description.appendElement(button);

			const { element } = description;

			bodyElements[i].append(element);
		}
	}
}

class HtmlElement {
	constructor(elementType) {
		this.element = document.createElement(elementType);
	}

	setId(id) {
		this.element.setAttribute("id", id);
	}

	addText(text) {
		this.element.innerText = text;
	}

	appendElement({ element }) {
		this.element.append(element);
	}
}

class LinkButton extends HtmlElement {
	constructor() {
		super("button");
	}

	handleClick(id) {}
}

class TableHead extends HtmlElement {
	constructor(id) {
		super("thead");
		this.setId(id);
	}
}

class TableBody extends HtmlElement {
	constructor(id) {
		super("tbody");
		this.setId(id);
	}
}

class TableRow extends HtmlElement {
	constructor() {
		super("tr");
	}
}

class TableHeader extends HtmlElement {
	constructor() {
		super("th");
	}
}

class TableDescription extends HtmlElement {
	constructor() {
		super("td");
	}
}
