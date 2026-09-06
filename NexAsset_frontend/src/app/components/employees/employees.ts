import { Component, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  Employee,
  EmployeeRequest,
  EmployeeResponse
} from '../../services/employee';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees {

  searchText: string = '';
  showAddEmployeeModal: boolean = false;
  showEditEmployeeModal: boolean = false;
  showViewEmployeeModal: boolean = false;
  isLoading: boolean = false;
  isSaving: boolean = false;
  selectedEmployee: EmployeeResponse | null = null;
  employees: EmployeeResponse[] = [];
  employeeForm: 
    EmployeeRequest = {
      name: '',
      email: '',
      department: '',
      jobTitle: ''
    };

  constructor(
  private employeeService: Employee,
  private snackBar: MatSnackBar,
  private cdr: ChangeDetectorRef
) {
  afterNextRender(() => {
    setTimeout(() => {
      this.loadEmployees();
    }, 0);
  });
}

  // ===== SEARCH =====
  get filteredEmployees(): EmployeeResponse[] {
    const search = this.searchText.trim().toLowerCase();
    if (!search) {
      return this.employees;
    }
    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(search) || 
      employee.email.toLowerCase().includes(search) ||
      (employee.department || '').toLowerCase().includes(search) || 
      (employee.jobTitle || '').toLowerCase().includes(search)
    );
  }

  //===== LOAD EMPLOYEES =====
   loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response.map((employee, index) => ({
        ...employee,
        initials: this.getInitials(employee.name),
        avatarClass: this.getAvatarClass(index)
      }));
    this.isLoading = false;
    this.cdr.detectChanges();
    console.log('Employees loaded:', this.employees);
    },
    error: (error) => {
        console.error('Error loading employees:', error);
        this.isLoading = false;
        this.showNotification('Unable to load employees.','error');
      }
    });
  }

  // ===== ADD EMPLOYEE =====
  addEmployee(): void {
    this.employeeForm = {name: '', email: '', department: '', jobTitle: '' };
    this.isSaving = false;
    this.showAddEmployeeModal = true;
  }
  closeAddEmployeeModal(): void {
    if (this.isSaving) {
      return;
    }
    this.showAddEmployeeModal = false;
  }
  submitAddEmployee(): void {
    if (!this.employeeForm.name.trim() || !this.employeeForm.email.trim()) {
      this.showNotification('Name and email are required.', 'warning');
      return;
    }
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    const request: EmployeeRequest = {
      name: this.employeeForm.name.trim(),
      email: this.employeeForm.email.trim(),
      department: this.employeeForm.department.trim(),
      jobTitle: this.employeeForm.jobTitle.trim()
    };
    this.employeeService.createEmployee(request).subscribe({
      next: (employee) => {
        const newEmployee: EmployeeResponse = {
          ...employee,
          initials: this.getInitials(employee.name),
          avatarClass: this.getAvatarClass(this.employees.length)
        };
        this.employees.push(newEmployee);
        this.isSaving = false;
        this.showAddEmployeeModal = false;
        this.showNotification('Employee added successfully.','success');
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        this.isSaving = false;
        if (error.status === 409) {
          this.showNotification('An employee with this email already exists.','error');
          return;
        }
        if (error.status === 400) {
          const message = error.error?.message || error.error?.error ||
           'Please enter valid employee details.';
          this.showNotification(message,'error');
          return;
        }
        this.showNotification('Unable to add employee. Please try again.','error');
      }
    });
  }

  // ===== VIEW EMPLOYEE ======
  viewEmployee(employee: EmployeeResponse): void {
    this.selectedEmployee = employee;
    this.showViewEmployeeModal = true;
  }
  closeViewEmployeeModal(): void {
    this.showViewEmployeeModal = false;
    this.selectedEmployee = null;
  }

  // ==== EDIT EMPLOYEE ====
  editEmployee(employee: EmployeeResponse): void {
    this.selectedEmployee = employee;
    this.employeeForm = {
      name: employee.name,
      email: employee.email,
      department: employee.department || '',
      jobTitle: employee.jobTitle || ''
    };
    this.isSaving = false;
    this.showEditEmployeeModal = true;
  }
  closeEditEmployeeModal(): void {
    if (this.isSaving) {
      return;
    }
    this.showEditEmployeeModal = false;
    this.selectedEmployee = null;
  }
  submitEditEmployee(): void {
    if (!this.selectedEmployee) {
      return;
    }
    if (!this.employeeForm.name.trim() || !this.employeeForm.email.trim()) {
      this.showNotification('Name and email are required.','warning');
      return;
    }
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    const employeeId = this.selectedEmployee.id;
    const request: EmployeeRequest = {
      name: this.employeeForm.name.trim(),
      email: this.employeeForm.email.trim(),
      department: this.employeeForm.department.trim(),
      jobTitle: this.employeeForm.jobTitle.trim()
    };
    this.employeeService.updateEmployee(employeeId, request).subscribe({
        next: (updatedEmployee) => {
          const index = this.employees.findIndex(employee => employee.id === employeeId);
          if (index !== -1) {
            this.employees[index] = {
              ...updatedEmployee,
              initials: this.getInitials(updatedEmployee.name),
              avatarClass:
                this.employees[index].avatarClass || this.getAvatarClass(index)
            };
          }
          this.isSaving = false;
          this.showEditEmployeeModal = false;
          this.selectedEmployee = null;
          this.showNotification('Employee updated successfully.','success');
        },
        error: (error) => {
          console.error('Error updating employee:',error);
          this.isSaving = false;
          if (error.status === 409) {
            this.showNotification('An employee with this email already exists.','error');
            return;
          }
          if (error.status === 400) {
            const message =
              error.error?.message || error.error?.error ||'Please enter valid employee details.';
            this.showNotification(message,'error');
            return;
          }
          this.showNotification('Unable to update employee.','error');
        }
      });
  }

  // ==== DELETE EMPLOYEE ====
  deleteEmployee(employee: EmployeeResponse): void {
    const confirmed = window.confirm(`Are you sure you want to delete ${employee.name}?`);
    if (!confirmed) {
      return;
    }
    this.employeeService.deleteEmployee(employee.id).subscribe({
        next: () => {
          this.employees = this.employees.filter(
            item => item.id !== employee.id
          );
          this.showNotification('Employee deleted successfully.','success');
        },
        error: (error) => {
          console.error('Error deleting employee:',error);
          this.showNotification('Unable to delete employee.','error');
        }
      });
  }

  // ==== UI HELPERS ====
  private getInitials(name: string): string {
    return name.trim().split(/\s+/).map(part => part.charAt(0).toUpperCase()).slice(0, 2).join('');
  }
  private getAvatarClass(index: number): string {
    const avatarClasses = [
      'orange',
      'red',
      'purple',
      'teal',
      'blue',
      'light-blue',
      'cyan',
      'indigo'
    ];
    return avatarClasses[index % avatarClasses.length];
  }

  // ==== NOTIFICATION ====
  private showNotification(message: string,type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message,'Close',
      {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: [`notification-${type}`]
      }
    );
  }
}