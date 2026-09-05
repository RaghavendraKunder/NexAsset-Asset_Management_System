import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Assets as AssetsService, AssetRequest, AssetResponse } from '../../services/assets';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-assets',
  standalone: false,
  templateUrl: './assets.html',
  styleUrl: './assets.css',
})
export class Assets implements OnInit {

  
  // FILTERS
  searchText: string = '';
  selectedType: string = 'all';
  selectedStatus: string = 'all';
  // ADD ASSET MODAL
  showAddAssetModal: boolean = false;
  addAssetForm: FormGroup;
  isSubmitting: boolean = false;
  submitError: string = '';
  // ASSIGN / EDIT / DELETE MODALS
  showAssignAssetModal: boolean = false;
  showEditAssetModal: boolean = false;
  showDeleteAssetModal: boolean = false;
  selectedAsset: any = null;
  assignAssetForm: FormGroup;
  editAssetForm: FormGroup;
  isAssigning: boolean = false;
  isEditing: boolean = false;
  isDeleting: boolean = false;
  actionError: string = '';
employees: string[] = [
  'Sarah Chen',
  'Marcus Johnson',
  'David Kim'
];
  // DROPDOWN OPTIONS
  assetTypes: string[] = [
    'Laptop',
    'Monitor',
    'Mobile Device',
    'Software License',
    'Keyboard',
    'Mouse'
  ];
  assetStatuses: string[] = [
    'Available',
    'Assigned',
    'Under Repair'
  ];
  assetConditions: string[] = [
    'New',
    'Good',
    'Fair',
    'Poor',
    'Damaged'
  ];

  constructor(
    private fb: FormBuilder,
    private assetsService: AssetsService,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {

    this.addAssetForm = this.fb.group({
      assetName: ['',[Validators.required, Validators.maxLength(100)]],
      type: ['Laptop', Validators.required],
      serialNumber: ['',[Validators.required, Validators.maxLength(100)]],
      status: ['Available',Validators.required],
      condition: ['New',Validators.required],
      purchaseDate: [''],
      purchaseValue: ['',[Validators.min(0)]],
      notes: ['',Validators.maxLength(500)]
    });

    // == ASSIGN ASSET FORM ==
    this.assignAssetForm = this.fb.group({
      employee: ['',Validators.required],
      condition: ['Good',Validators.required],
      notes: ['',Validators.maxLength(500)]
    });
    // == EDIT ASSET FORM ==
    this.editAssetForm = this.fb.group({
      assetName: ['',[Validators.required,Validators.maxLength(100)]],
      type: ['Laptop',Validators.required],
      serialNumber: ['',[Validators.required,Validators.maxLength(100)]],
      status: ['Available',Validators.required],
      condition: ['Good',Validators.required],
      purchaseDate: [''],
      purchaseValue: ['',Validators.min(0)],
      notes: ['',Validators.maxLength(500)]
    });
  }

  // LOAD ASSETS FROM BACKEND
  ngOnInit(): void {
    const token = this.auth.getToken();
    if (!token) {
      console.error('No authentication token found.');
      return;
    }
    this.assetsService.getAllAssets(token).subscribe({
      next: (response) => {
        console.log('Assets loaded successfully:', response);
        this.assets = response.map(asset => ({
          name: asset.assetName,
          type: this.displayAssetType(asset.type),
          serial: asset.serialNumber,
          status: this.displayAssetStatus(asset.status),
          assignedTo: asset.assignedToName || '—',
          initials: this.getInitials(asset.assignedToName),
          condition: this.displayAssetCondition(asset.condition),
          value: asset.purchaseValue ?? 0,
          icon: this.getAssetIcon(asset.type)
        }));
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load assets:', error);
        if (error.status === 401 || error.status === 403) {
          console.error('Authentication failed. Please log in again.');
        }
      }
    });
  }

  // == EXISTING ASSETS ==
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


  // =========================================================
  // FILTERED ASSETS
  // =========================================================

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


  // =========================================================
  // OPEN ADD ASSET MODAL
  // =========================================================

  addAsset(): void {

    this.addAssetForm.reset({
      assetName: '',
      type: 'Laptop',
      serialNumber: '',
      status: 'Available',
      condition: 'New',
      purchaseDate: '',
      purchaseValue: '',
      notes: ''
    });

    this.showAddAssetModal = true;
  }


  // =========================================================
  // CLOSE ADD ASSET MODAL
  // =========================================================

 closeAddAssetModal(): void {

  this.showAddAssetModal = false;
  this.submitError = '';
  this.isSubmitting = false;

  this.addAssetForm.reset({
    assetName: '',
    type: 'Laptop',
    serialNumber: '',
    status: 'Available',
    condition: 'New',
    purchaseDate: '',
    purchaseValue: '',
    notes: ''
  });
}


  // =========================================================
  // SUBMIT ADD ASSET FORM
  // =========================================================

  // =========================================================
// SUBMIT ADD ASSET FORM
// =========================================================

submitAddAsset(): void {

  if (this.addAssetForm.invalid) {
    this.addAssetForm.markAllAsTouched();
    return;
  }

  const token = this.auth.getToken();

  if (!token) {
    this.submitError = 'Your session has expired. Please log in again.';
    return;
  }

  const formData = this.addAssetForm.value;

  const assetRequest: AssetRequest = {
    assetName: formData.assetName.trim(),

    type: this.convertAssetType(formData.type),

    serialNumber: formData.serialNumber.trim(),

    status: this.convertAssetStatus(formData.status),

    condition: this.convertAssetCondition(formData.condition),

    purchaseDate: formData.purchaseDate || null,

    purchaseValue:
      formData.purchaseValue !== ''
        ? Number(formData.purchaseValue)
        : null,

    notes:
      formData.notes?.trim()
        ? formData.notes.trim()
        : null
  };

  this.isSubmitting = true;
  this.submitError = '';

  this.assetsService.createAsset(assetRequest, token).subscribe({

    next: (response: AssetResponse) => {

      console.log('Asset created successfully:', response);

      // Add the newly created asset to the current table
      this.assets.push({
        name: response.assetName,
        type: this.displayAssetType(response.type),
        serial: response.serialNumber,
        status: this.displayAssetStatus(response.status),
        assignedTo: response.assignedToName || '—',
        initials: this.getInitials(response.assignedToName),
        condition: this.displayAssetCondition(response.condition),
        value: response.purchaseValue ?? 0,
        icon: this.getAssetIcon(response.type)
      });

      this.isSubmitting = false;

      this.closeAddAssetModal();
    },

    error: (error) => {

      console.error('Failed to create asset:', error);

      this.isSubmitting = false;

      if (error.status === 400 && error.error?.error) {
        this.submitError = error.error.error;
      }
      else if (error.status === 401 || error.status === 403) {
        this.submitError =
          'You are not authorized to add assets. Please log in again.';
      }
      else {
        this.submitError =
          'Failed to add asset. Please try again.';
      }
    }

  });
}

// =========================================================
// ENUM CONVERSIONS
// =========================================================

private convertAssetType(type: string): string {

  const typeMap: { [key: string]: string } = {
    'Laptop': 'LAPTOP',
    'Monitor': 'MONITOR',
    'Mobile Device': 'MOBILE_DEVICE',
    'Software License': 'SOFTWARE_LICENSE',
    'Keyboard': 'KEYBOARD',
    'Mouse': 'MOUSE'
  };

  return typeMap[type] || type.toUpperCase();
}


private convertAssetStatus(status: string): string {

  const statusMap: { [key: string]: string } = {
    'Available': 'AVAILABLE',
    'Assigned': 'ASSIGNED',
    'Under Repair': 'UNDER_REPAIR'
  };

  return statusMap[status] || status.toUpperCase();
}


private convertAssetCondition(condition: string): string {

  const conditionMap: { [key: string]: string } = {
    'New': 'NEW',
    'Good': 'GOOD',
    'Fair': 'FAIR',
    'Poor': 'POOR',
    'Damaged': 'DAMAGED'
  };

  return conditionMap[condition] || condition.toUpperCase();
}

// =========================================================
// DISPLAY HELPERS
// =========================================================

private displayAssetType(type: string): string {

  const typeMap: { [key: string]: string } = {
    'LAPTOP': 'Laptop',
    'MONITOR': 'Monitor',
    'MOBILE_DEVICE': 'Mobile Device',
    'SOFTWARE_LICENSE': 'Software License',
    'KEYBOARD': 'Keyboard',
    'MOUSE': 'Mouse'
  };

  return typeMap[type] || type;
}


private displayAssetStatus(status: string): string {

  const statusMap: { [key: string]: string } = {
    'AVAILABLE': 'Available',
    'ASSIGNED': 'Assigned',
    'UNDER_REPAIR': 'Under Repair'
  };

  return statusMap[status] || status;
}


private displayAssetCondition(condition: string): string {

  const conditionMap: { [key: string]: string } = {
    'NEW': 'New',
    'GOOD': 'Good',
    'FAIR': 'Fair',
    'POOR': 'Poor',
    'DAMAGED': 'Damaged'
  };

  return conditionMap[condition] || condition;
}


private getAssetIcon(type: string): string {

  const iconMap: { [key: string]: string } = {
    'LAPTOP': 'laptop',
    'MONITOR': 'desktop_windows',
    'MOBILE_DEVICE': 'smartphone',
    'SOFTWARE_LICENSE': 'description',
    'KEYBOARD': 'keyboard',
    'MOUSE': 'mouse'
  };

  return iconMap[type] || 'inventory_2';
}


private getInitials(name: string | null): string {

  if (!name) {
    return '';
  }

  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

  // =========================================================
// OPEN ASSIGN ASSET MODAL
// =========================================================

assignAsset(asset: any): void {

  this.selectedAsset = asset;

  this.actionError = '';

  this.assignAssetForm.reset({
    employee: '',
    condition: asset.condition || 'Good',
    notes: ''
  });

  this.showAssignAssetModal = true;
}


// =========================================================
// CLOSE ASSIGN ASSET MODAL
// =========================================================

closeAssignAssetModal(): void {

  this.showAssignAssetModal = false;

  this.selectedAsset = null;
  this.actionError = '';

  this.assignAssetForm.reset({
    employee: '',
    condition: 'Good',
    notes: ''
  });
}


// =========================================================
// OPEN EDIT ASSET MODAL
// =========================================================

editAsset(asset: any): void {

  this.selectedAsset = asset;

  this.actionError = '';

  this.editAssetForm.reset({
    assetName: asset.name,
    type: asset.type,
    serialNumber: asset.serial,
    status: asset.status,
    condition: asset.condition,
    purchaseDate: '',
    purchaseValue: asset.value,
    notes: ''
  });

  this.showEditAssetModal = true;
}


// =========================================================
// CLOSE EDIT ASSET MODAL
// =========================================================

closeEditAssetModal(): void {

  this.showEditAssetModal = false;

  this.selectedAsset = null;
  this.actionError = '';
}


// =========================================================
// OPEN DELETE CONFIRMATION
// =========================================================

deleteAsset(asset: any): void {

  this.selectedAsset = asset;

  this.actionError = '';

  this.showDeleteAssetModal = true;
}


// =========================================================
// CLOSE DELETE CONFIRMATION
// =========================================================

closeDeleteAssetModal(): void {

  this.showDeleteAssetModal = false;

  this.selectedAsset = null;
  this.actionError = '';
}

}