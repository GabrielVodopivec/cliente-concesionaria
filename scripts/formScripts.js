import { Observer, baseURL } from "./app.js";
let vehicleForm = document.getElementById("vehicleForm");

export class Observable {
    constructor() {
        this.suscriptor = null;
    }

    suscribe(observer) {
        this.suscriptor = observer;
    }

    notify() {
        this.suscriptor.notifyMe();
    }
}

const observer = new Observer();
const observable = new Observable();

observable.suscribe(observer);

const datosObtenidosDelForm = (elements) => {
    let result = {};

    for (let i = 0; i < elements.length; i++) {
        const { name, value, type } = elements[i];
        if (type === "submit") continue;
        result = {
            ...result,
            [name]: value
        };
    }

    result.services = [
        {
            date: "2022-10-20",
            kilometers: 321321,
            descriptions: "Mantenimiento de rutina"
        },
        {
            date: "2022-11-20",
            kilometers: 321654,
            descriptions: "Otro mantenimiento"
        }
    ];

    return result;
};

const handleSubmit = async (event) => {
    event.preventDefault();

    const { target } = event;
    const { elements: vehicle } = target;

    const json = JSON.stringify(datosObtenidosDelForm(vehicle));
    const response = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json
    });

    if (response.ok) {
        observable.notify();
    }
};

vehicleForm.onsubmit = handleSubmit;
