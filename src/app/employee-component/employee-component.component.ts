import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})
export class EmployeeComponentComponent {
  employeeForm = new FormGroup({
    name: new FormControl(''),
    salary: new FormControl(''),
    deductions: new FormControl(''),
  });
  calculatedPay: number | undefined;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  calculatePay(): void {
    const { name, salary, deductions } = this.employeeForm.value;
    const employeeWithId = { _id: '', name: name!, salary: salary!, deductions: deductions! };     
    this.employeeService.calculatePay(employeeWithId).subscribe((pay) => {
      this.calculatedPay = pay;
    });
  }
}
