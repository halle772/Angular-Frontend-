import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../Employee';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  employees: Employee[] = [];
  netPay: any;

  constructor(
    public authService: AuthService,
    private router: Router, 
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(
        (employees: Employee[]) => {
          console.log(employees)
          this.employees = employees;
          this.calculateNetPay();
        },
        (error) => {
          console.error('Error fetching employees:', error);
          // Handle error
        }
      );
  }

  calculateNetPay(): void {
    this.employees.forEach(employee => {
      const netPay = employee.salary - employee.deductions;
      employee.netPay = netPay;
    });
  }

  editEmployee(employeeId: string | undefined): void {
    this.router.navigate(['/employee', 'edit', employeeId]);
  }

  deleteEmployee(employeeId: string | undefined): void {
    if (employeeId === undefined) return;
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(+employeeId)
        .subscribe(() => {
          // Reload employees after deletion
          this.loadEmployees();
        },
        (error) => {
          console.error('Error deleting employee:', error);
          // Handle error
        });
    }
  }
}
