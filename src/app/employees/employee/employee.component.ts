import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: null,
      User: '',
      Password: '',
      Email: '',
      Address: ''
    }
  }


  onSubmit(form: NgForm) {
    if (form.value.Id == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    delete form.value['Id'];
    this.service.postEmployee(form.value).subscribe(res => {
      this.toastr.success('Insertado correctamente', 'Registro de usuarios');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {
      this.toastr.info('Actualizado correctamente', 'Registro de usuarios');
      this.resetForm(form);
      this.service.refreshList();
    });

  }

}
