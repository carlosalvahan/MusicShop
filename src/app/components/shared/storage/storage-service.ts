import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { sessionKeys } from "../../../app.constants";
import { isPlatformBrowser } from "@angular/common";
import { LOCAL_STORAGE } from "../tokens/token";



@Injectable({providedIn: 'root'})
export class StorageService {
    private readonly platformId = inject(PLATFORM_ID);
    private storage = inject(LOCAL_STORAGE);

    assignItemToSession(key: string, token: string) {
            this.storage.setItem(key, token);
    }

    getItemFromSession<T>(key: string) {
        const storedValue = this.storage.getItem(key);
        return storedValue ? (storedValue as T): null;
    }

    removeItemFromSession(key: string) {
        this.storage.removeItem(key);
    }
}