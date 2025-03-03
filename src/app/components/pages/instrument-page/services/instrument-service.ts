import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class InstrumentService {
    private httpClient = inject(HttpClient);

    getManufacturers(): Observable<any> {
       return this.httpClient.get('../../../../mockdata/manufacturers.json')
    }

    getInstrumentTypes(): Observable<any> {
        return this.httpClient.get('../../../../mockdata/manufacturers.json')
     }
}