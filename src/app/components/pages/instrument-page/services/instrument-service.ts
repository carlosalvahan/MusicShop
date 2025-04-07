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
      return this.httpClient.get<Instrument[]>(APIURL.instrumentApi);
     }

     createInstrument(reqBody: FormData): Observable<any> {
      return this.httpClient.post(APIURL.instrumentApi, reqBody);
     }

     getInstrumentById(id: number): Observable<Instrument> {
      return this.httpClient.get<Instrument>(APIURL.instrumentById.replace('${0}', id.toString()));
     }

     updateInstrument(reqBody: FormData) {
      return this.httpClient.put(APIURL.instrumentApi, reqBody);
     }

     deleteInstrument(id: number) {
      return this.httpClient.delete(APIURL.instrumentById.replace('${0}', id.toString()));
     }
}