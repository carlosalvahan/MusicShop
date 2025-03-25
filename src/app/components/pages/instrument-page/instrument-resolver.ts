import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { InstrumentService } from "./services/instrument-service";
import { Instrument } from "./instrument-model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { APIURL } from "../../../app.constants";

@Injectable({ providedIn: 'root' })
export class InstrumentResolver implements Resolve<Instrument> {
  constructor(private httpClient: HttpClient) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Instrument>{
    const instrumentId = route.paramMap.get('id') || '0';

    return this.httpClient.get<Instrument>(APIURL.instrumentById.replace('${0}', instrumentId.toString()));
  }
}