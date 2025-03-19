import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIURL } from "../../../../app.constants";
import { Instrument } from "../instrument-model";

@Injectable()

export class InstrumentService {
    private httpClient = inject(HttpClient);

    getManufacturers(): Observable<any> {
       return this.httpClient.get('assets/mock-data/manufacturers.json');
    }

    getInstrumentTypes(): Observable<any> {
      return this.httpClient.get('assets/mock-data/types.json');
     }

     getInstrumentList(): Observable<Instrument[]> {
      return this.httpClient.get<Instrument[]>(APIURL.getInstrumentList);
     }
}