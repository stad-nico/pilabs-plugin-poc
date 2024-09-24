import { Component } from "@angular/core";
import { Observable, map } from "rxjs";

import { PiHubAPIService } from "@pihub/api";

@Component({
	selector: "test-component",
	templateUrl: "./TestComponent.html",
})
export class TestComponent {
	private readonly api: PiHubAPIService;

	private readonly temp$: Observable<number>;

	public temp: number = 0;

	constructor(api: PiHubAPIService) {
		this.api = api;

		this.temp$ = api.systemMetrics.getSystemMetrics().pipe(map(metrics => metrics.cpuTemperature));
	}

	ngOnInit() {
		this.temp$.subscribe(temperature => (this.temp = temperature));
	}
}
