import { CustomTable } from "../scripts/utils/CustomTable.js";

const myTable = new CustomTable("myTable");
const getBody = (response) => response.json();
const theError = (error) => console.error(error);

async function getData() {
	return fetch("./data.json").then(getBody).catch(theError);
}

const data = await getData();
const { table } = myTable.populate(data);

myTable.addLinkButton("Servicios", "ver");
myTable.addLinkButton("", "Eliminar");

table.style.textAlign = "center";
table.style.borderColor = "black";
table.style.borderWidth = "2px";
table.style.borderStyle = "solid";
table.style.borderRadius = "5px";
table.cellPadding = "0px";
table.cellSpacing = "20px";

document.body.append(table);
