import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData  : Employee;
  list : Employee[];
  readonly rootURL ="https://webserviceutec.azurewebsites.net/api"

  constructor(private http : HttpClient) { }

  postEmployee(formData : Employee){
   return this.http.post(this.rootURL+'/Usuarios',formData);
    
  }

  refreshList(){
    this.http.get(this.rootURL+'/Usuarios')
    .toPromise().then(res => this.list = res as Employee[]);
  }

  putEmployee(formData : Employee){
    return this.http.put(this.rootURL+'/Usuarios/'+formData.Id,formData);
     
   }

   deleteEmployee(id : number){
    return this.http.delete(this.rootURL+'/Usuarios/'+id);
   }
}
