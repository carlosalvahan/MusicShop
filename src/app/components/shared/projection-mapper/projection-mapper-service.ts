import { Injectable } from "@angular/core";

@Injectable()
export class ProjectionMapper {
    mapProjectionItems<T>(obj: any, propName: string) {
        let newObj: any = {};
        Object.keys(obj).forEach(key => {
          const notPropId = key.toLowerCase() !== (propName.toLowerCase() + 'id');
          const hasPropName = key.toLowerCase().includes(propName.toLowerCase());
          if (notPropId && hasPropName) {
            const newKey = key.replace(propName, '');
            const useKey = newKey === 'ImageUrl' ? 'imageUrl' : newKey.toLowerCase();
            newObj[useKey] = obj[key];
          } else {
            newObj[key] = obj[key]
          }
        })
        return newObj as T;
      }
}