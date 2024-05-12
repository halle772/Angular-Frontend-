import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      salary: [0, Validators.required],
      deductions: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        this.isEditMode = true;
        this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
          this.employeeForm.patchValue({
            name: employee.name,
            salary: employee.salary,
            deductions: employee.deductions
          });
        });
      }
    });
  }

  onSubmit(): void {
    const employeeData: Employee = this.employeeForm.value;
    if (this.isEditMode && this.employeeId) {
      employeeData.id = this.employeeId;
      this.employeeService.updateEmployee(employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.addEmployee(employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
