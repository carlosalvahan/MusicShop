import { Injectable } from "@angular/core";



@Injectable({providedIn: 'root'})
export class StorageService {

    assignItemToSession(key: string, token: string) {
        localStorage.setItem(key, token);
    }

    getItemFromSession<T>(key: string) {
        const storedValue = localStorage.getItem(key);
        return storedValue ? (storedValue as T): null;
    }

    removeItemFromSession(key: string) {
        localStorage.removeItem(key);
    }
}