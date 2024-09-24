import { Component } from "@angular/core";
import { Observable, map } from "rxjs";

import { PiLabsAPIService } from "../pilabs-api/api/pi-labs-api.service";

@Component({
	selector: "test-component",
	templateUrl: "./TestComponent.html",
})
export class TestComponent {
	private readonly api: PiLabsAPIService;

	private readonly temp$: Observable<number>;

	public temp: number = 0;

	constructor(api: PiLabsAPIService) {
		this.api = api;

		this.temp$ = api.systemMetrics.getSystemMetrics().pipe(map(metrics => metrics.cpuTemperature));
	}

	ngOnInit() {
		this.temp$.subscribe(temperature => (this.temp = temperature));
	}
}
