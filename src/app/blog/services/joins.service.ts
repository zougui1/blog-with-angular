import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JoinsService {

  constructor() { }

  join(retrieve, joined) {
    let objectsJoined = {};
    retrieve.properties.forEach(element => {
      let retrievied = this.retrievePropertyToJoin(retrieve.object, element);
      if (retrieve.prefix === '')
        Object.assign(objectsJoined, { [retrieve.prefix + element]: retrievied });
      else
        Object.assign(objectsJoined, { [retrieve.prefix + this.upperCaseFirst(element)]: retrievied });
    });
    let updatedUser = this.joinObject(joined, objectsJoined);

    return Object.assign({}, updatedUser);
  }

  upperCaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.substr(1);
  }

  retrievePropertyToJoin(object, property) {
    return object[property];
  }

  joinObject(joinedObject: Object, objectToJoin: Object): Object {
    let newObject = Object.assign(joinedObject, objectToJoin);
    return newObject;
  }
  
}
