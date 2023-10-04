import { serviceInfo } from "./formDataProcessor.js";

export class Observer {
	constructor(action) {
		this.action = action;
	}
	notifyMe() {
		this.action();
	}
}

export class Observable {
	constructor(suscriptor = null) {
		this.suscriptor = suscriptor;
	}

	suscribe(suscriptor) {
		this.suscriptor = suscriptor;
	}

	notify() {
		serviceInfo.length = 0;
		this.suscriptor.notifyMe();
	}
}
