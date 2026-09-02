import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees { 
  
  searchText: string = '';

  employees = [
    {
      name: 'Aisha Mohammed',
      initials: 'AM',
      jobTitle: 'Financial Analyst',
      email: 'aisha.m@company.com',
      department: 'Finance',
      assignedAssets: 0,
      assets: [],
      avatarClass: 'orange'
    },

    {
      name: 'David Kim',
      initials: 'DK',
      jobTitle: 'Marketing Manager',
      email: 'david.kim@company.com',
      department: 'Marketing',
      assignedAssets: 1,
      assets: [
        'iPhone 15 Pro'
      ],
      avatarClass: 'red'
    },

    {
      name: 'Elena Rodriguez',
      initials: 'ER',
      jobTitle: 'Operations Lead',
      email: 'elena.r@company.com',
      department: 'Operations',
      assignedAssets: 0,
      assets: [],
      avatarClass: 'purple'
    },

    {
      name: 'James Wilson',
      initials: 'JW',
      jobTitle: 'DevOps Engineer',
      email: 'james.w@company.com',
      department: 'Engineering',
      assignedAssets: 1,
      assets: [
        'JetBrains All Products'
      ],
      avatarClass: 'teal'
    },

    {
      name: 'Marcus Johnson',
      initials: 'MJ',
      jobTitle: 'Lead Product Designer',
      email: 'marcus.j@company.com',
      department: 'Design',
      assignedAssets: 2,
      assets: [
        'Dell UltraSharp 32" 4K',
        'Adobe Creative Cloud'
      ],
      avatarClass: 'blue'
    },

    {
      name: 'Priya Patel',
      initials: 'PP',
      jobTitle: 'Frontend Engineer',
      email: 'priya.patel@company.com',
      department: 'Engineering',
      assignedAssets: 1,
      assets: [
        'Figma Organization'
      ],
      avatarClass: 'light-blue'
    },

    {
      name: 'Sarah Chen',
      initials: 'SC',
      jobTitle: 'Software Engineer',
      email: 'sarah.chen@company.com',
      department: 'Engineering',
      assignedAssets: 2,
      assets: [
        'MacBook Pro 16" M3',
        'Keychron K2 Mechanical'
      ],
      avatarClass: 'cyan'
    },

    {
      name: 'Daniel Brown',
      initials: 'DB',
      jobTitle: 'Product Manager',
      email: 'daniel.b@company.com',
      department: 'Product',
      assignedAssets: 1,
      assets: [
        'MacBook Pro 14" M2'
      ],
      avatarClass: 'indigo'
    }
  ];


  get filteredEmployees() {

    const search = this.searchText
      .toLowerCase()
      .trim();

    if (!search) {
      return this.employees;
    }

    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search) ||
      employee.jobTitle.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search)
    );
  }


  addEmployee(): void {

    console.log('Add employee clicked');

  }


  viewEmployee(employee: any): void {

    console.log('View employee:', employee);

  }


  editEmployee(employee: any): void {

    console.log('Edit employee:', employee);

  }


  deleteEmployee(employee: any): void {

    console.log('Delete employee:', employee);

  }

}
