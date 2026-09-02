import { Component } from '@angular/core';

@Component({
  selector: 'app-assets',
  standalone: false,
  templateUrl: './assets.html',
  styleUrl: './assets.css',
})
export class Assets {

  searchText: string = '';
  selectedType: string = 'all';
  selectedStatus: string = 'all';

  assets = [
    {
      name: 'MacBook Pro 16" M3',
      type: 'Laptop',
      serial: 'MBP16-M3-001',
      status: 'Assigned',
      assignedTo: 'Sarah Chen',
      initials: 'SC',
      condition: 'Good',
      value: 2499,
      icon: 'laptop'
    },
    {
      name: 'MacBook Pro 14" M2',
      type: 'Laptop',
      serial: 'MBP14-M2-042',
      status: 'Available',
      assignedTo: '—',
      initials: '',
      condition: 'Good',
      value: 1999,
      icon: 'laptop'
    },
    {
      name: 'Dell UltraSharp 32" 4K',
      type: 'Monitor',
      serial: 'DELL-U3223-101',
      status: 'Assigned',
      assignedTo: 'Marcus Johnson',
      initials: 'MJ',
      condition: 'New',
      value: 899,
      icon: 'desktop_windows'
    },
    {
      name: 'LG UltraFine 27"',
      type: 'Monitor',
      serial: 'LG-27UQ-205',
      status: 'Available',
      assignedTo: '—',
      initials: '',
      condition: 'Good',
      value: 649,
      icon: 'desktop_windows'
    },
    {
      name: 'Keychron K2 Mechanical',
      type: 'Keyboard',
      serial: 'KC-K2-889',
      status: 'Assigned',
      assignedTo: 'Sarah Chen',
      initials: 'SC',
      condition: 'Good',
      value: 99,
      icon: 'keyboard'
    },
    {
      name: 'Logitech MX Master 3S',
      type: 'Mouse',
      serial: 'LOG-MX3S-447',
      status: 'Available',
      assignedTo: '—',
      initials: '',
      condition: 'New',
      value: 99,
      icon: 'mouse'
    },
    {
      name: 'iPhone 15 Pro',
      type: 'Mobile Device',
      serial: 'IPH15P-721',
      status: 'Assigned',
      assignedTo: 'David Kim',
      initials: 'DK',
      condition: 'Good',
      value: 999,
      icon: 'smartphone'
    },
    {
      name: 'Adobe Creative Cloud',
      type: 'Software License',
      serial: 'ACC-2025-001',
      status: 'Assigned',
      assignedTo: 'Marcus Johnson',
      initials: 'MJ',
      condition: 'Active',
      value: 659,
      icon: 'description'
    }
  ];


  get filteredAssets() {

    return this.assets.filter(asset => {

      const search = this.searchText.toLowerCase().trim();

      const matchesSearch =
        !search ||
        asset.name.toLowerCase().includes(search) ||
        asset.serial.toLowerCase().includes(search);

      const matchesType =
        this.selectedType === 'all' ||
        asset.type === this.selectedType;

      const matchesStatus =
        this.selectedStatus === 'all' ||
        asset.status === this.selectedStatus;

      return matchesSearch &&
             matchesType &&
             matchesStatus;

    });

  }


  addAsset(): void {
    console.log('Add asset clicked');
  }


  assignAsset(asset: any): void {
    console.log('Assign asset:', asset);
  }


  editAsset(asset: any): void {
    console.log('Edit asset:', asset);
  }


  deleteAsset(asset: any): void {
    console.log('Delete asset:', asset);
  }

}
