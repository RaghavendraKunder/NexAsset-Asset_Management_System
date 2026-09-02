import { Component } from '@angular/core';

@Component({
  selector: 'app-assignments',
  standalone: false,
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
})
export class Assignments {
  activeTab: 'active' | 'returned' = 'active';

  searchText: string = '';

  assignments = [

    {
      assetName: 'Dell UltraSharp 32" 4K',
      assetType: 'Monitor',
      serial: 'DELL-U3223-101',
      employeeName: 'Marcus Johnson',
      employeeInitials: 'MJ',
      department: 'Design',
      assignedDate: 'Mar 1, 2024',
      returnDate: '',
      notes: 'Design setup',
      icon: 'desktop_windows',
      avatarClass: 'blue',
      status: 'Active'
    },

    {
      assetName: 'Keychron K2 Mechanical',
      assetType: 'Keyboard',
      serial: 'KC-K2-889',
      employeeName: 'Sarah Chen',
      employeeInitials: 'SC',
      department: 'Engineering',
      assignedDate: 'Feb 15, 2024',
      returnDate: '',
      notes: 'Engineering keyboard',
      icon: 'keyboard',
      avatarClass: 'cyan',
      status: 'Active'
    },

    {
      assetName: 'MacBook Pro 16" M3',
      assetType: 'Laptop',
      serial: 'MBP16-M3-001',
      employeeName: 'Sarah Chen',
      employeeInitials: 'SC',
      department: 'Engineering',
      assignedDate: 'Feb 1, 2024',
      returnDate: '',
      notes: 'Onboarding equipment',
      icon: 'laptop',
      avatarClass: 'cyan',
      status: 'Active'
    },

    {
      assetName: 'iPhone 15 Pro',
      assetType: 'Mobile Device',
      serial: 'IPH15P-721',
      employeeName: 'David Kim',
      employeeInitials: 'DK',
      department: 'Marketing',
      assignedDate: 'Feb 1, 2024',
      returnDate: '',
      notes: 'Company mobile device',
      icon: 'smartphone',
      avatarClass: 'red',
      status: 'Active'
    },

    {
      assetName: 'JetBrains All Products',
      assetType: 'Software License',
      serial: 'JET-2024-001',
      employeeName: 'James Wilson',
      employeeInitials: 'JW',
      department: 'Engineering',
      assignedDate: 'Jan 28, 2024',
      returnDate: '',
      notes: 'Development tools',
      icon: 'description',
      avatarClass: 'teal',
      status: 'Active'
    },

    {
      assetName: 'MacBook Pro 14" M2',
      assetType: 'Laptop',
      serial: 'MBP14-M2-042',
      employeeName: 'Priya Patel',
      employeeInitials: 'PP',
      department: 'Engineering',
      assignedDate: 'Jan 20, 2024',
      returnDate: '',
      notes: 'Frontend development',
      icon: 'laptop',
      avatarClass: 'light-blue',
      status: 'Active'
    },

    // Returned examples

    {
      assetName: 'MacBook Air M2',
      assetType: 'Laptop',
      serial: 'MBA-M2-102',
      employeeName: 'Elena Rodriguez',
      employeeInitials: 'ER',
      department: 'Operations',
      assignedDate: 'Dec 10, 2023',
      returnDate: 'Jan 18, 2024',
      notes: 'Employee equipment',
      icon: 'laptop',
      avatarClass: 'purple',
      status: 'Returned'
    },

    {
      assetName: 'Logitech MX Master 3S',
      assetType: 'Mouse',
      serial: 'LOG-MX3S-447',
      employeeName: 'David Kim',
      employeeInitials: 'DK',
      department: 'Marketing',
      assignedDate: 'Nov 15, 2023',
      returnDate: 'Jan 5, 2024',
      notes: 'Marketing equipment',
      icon: 'mouse',
      avatarClass: 'red',
      status: 'Returned'
    }

  ];


  get filteredAssignments() {

    const search = this.searchText
      .toLowerCase()
      .trim();

    return this.assignments.filter(assignment => {

      const matchesTab =
        assignment.status ===
        (this.activeTab === 'active'
          ? 'Active'
          : 'Returned');

      const matchesSearch =
        !search ||
        assignment.assetName
          .toLowerCase()
          .includes(search) ||

        assignment.serial
          .toLowerCase()
          .includes(search) ||

        assignment.employeeName
          .toLowerCase()
          .includes(search);

      return matchesTab && matchesSearch;

    });

  }


  setTab(tab: 'active' | 'returned'): void {

    this.activeTab = tab;

    this.searchText = '';

  }


  newAssignment(): void {

    console.log('New assignment clicked');

  }


  returnAssignment(assignment: any): void {

    console.log(
      'Return assignment:',
      assignment
    );

  }


  viewAssignment(assignment: any): void {

    console.log(
      'View assignment:',
      assignment
    );

  }

}
