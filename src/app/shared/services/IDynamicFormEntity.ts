import { Observable } from "rxjs";

export interface IDynamicFormEntity {
  createEntity(entity: any): Observable<any>;
}