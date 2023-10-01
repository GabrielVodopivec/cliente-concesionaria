export const baseURL = "http://localhost:8080/v1/api/vehicles/";

let vehicleTable = document.getElementById("vehicleTable");
let servicesTable = document.getElementById("servicesTable");

let showVehicles = document.getElementById("showVehicles");

servicesTable.style.display = "none";

vehicleTable.onmouseleave = verEvent;
function verEvent(event) {
    console.log(event);
}

let vehiclesList;
let servicesMap = {};

export class Observer {
    constructor() {}
    notifyMe() {
        getAllVehicles();
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
};

const handleCloseButton = () => {
    servicesTable.style.display = "none";
};

const showServices = (response) => {
    const { services, model } = response;

    const tBodyServices = document.createElement("tbody");
    tBodyServices.setAttribute("id", "tBodyServices");

    for (let i = 0; i < services.length; i++) {
        const tr = document.createElement("tr");
        const service = services[i];
        for (const prop in service) {
            const td = document.createElement("td");
            td.innerText = service[prop];
            tr.append(td);
        }
        tBodyServices.append(tr);
    }

    let oldTBodyServices = document.getElementById("tBodyServices");
    if (oldTBodyServices) {
        oldTBodyServices.remove();
    }
    servicesTable.append(tBodyServices);
    servicesTable.style.display = "block";

    let caption = servicesTable.createCaption();
    caption.innerText = `Servicios del ${model}`;

    const btn = document.createElement("button");
    btn.setAttribute("id", "closeButton");
    btn.innerText = "X";
    btn.addEventListener("click", handleCloseButton);

    caption.append(btn);
};

const elError = (err) => {
    console.log(err);
};

const hanldeViewDetail = (event) => {
    console.log(event);
    const { target } = event;
    const { id } = target;
    const detailURL = baseURL + id;
    fetchData(detailURL).then(showServices).catch(elError);
};

const createdLinkTd = (id) => {
    const tdDetail = document.createElement("td");
    const link = document.createElement("button");
    link.setAttribute("id", id);
    link.setAttribute("class", "btn-detail");
    link.innerText = "Ver";
    tdDetail.append(link);
    return tdDetail;
};

const getAllVehicles = async () => {
    document.getElementById("tBodyVehicles").remove();

    const tBodyVehicles = document.createElement("tbody");
    tBodyVehicles.setAttribute("id", "tBodyVehicles");

    try {
        vehiclesList = await fetchData(baseURL);
        for (let i = 0; i < vehiclesList.length; i++) {
            const tr = document.createElement("tr");
            const vehicle = vehiclesList[i];
            for (let prop in vehicle) {
                const td = document.createElement("td");
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
    vehicleTable.style.display = "block";
    let btns = document.getElementsByClassName("btn-detail");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", hanldeViewDetail);
    }
};

showVehicles.onclick = getAllVehicles;
