import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Assets as AssetsService,
  AssetRequest,
  AssetResponse
} from '../../services/assets';

import {
  Employee,
  EmployeeResponse
} from '../../services/employee';

import { Auth } from '../../services/auth';


// =========================================================
// FRONTEND ASSET INTERFACE
// =========================================================

interface AssetUI {

  // Database ID
  id: number;

  // Backend-style properties used by HTML
  assetName: string;
  serialNumber: string;
  assignedToName: string | null;
  assignedToId: number | null;
  purchaseValue: number | null;

  // Display properties
  displayType: string;
  displayStatus: string;
  displayCondition: string;

  // Original enum values
  type: string;
  status: string;
  condition: string;

  // Other asset information
  purchaseDate: string | null;
  notes: string | null;

  // UI
  icon: string;
  initials: string;

  // Optional compatibility properties
  name?: string;
  serial?: string;
  assignedTo?: string;
  value?: number;
}


// =========================================================
// COMPONENT
// =========================================================

@Component({
  selector: 'app-assets',
  standalone: false,
  templateUrl: './assets.html',
  styleUrls: ['./assets.css']
})
export class Assets implements OnInit {


  // =========================================================
  // FILTERS
  // =========================================================

  searchText: string = '';

  selectedType: string = 'All Types';

  selectedStatus: string = 'All Statuses';


  // =========================================================
  // MODAL STATES
  // =========================================================

  showAddModal: boolean = false;

  showAssignModal: boolean = false;

  showEditModal: boolean = false;

  showDeleteModal: boolean = false;


  // =========================================================
  // SELECTED ASSET
  // =========================================================

  selectedAsset: AssetUI | null = null;


  // =========================================================
  // ERROR / LOADING STATES
  // =========================================================

  submitError: string = '';

  actionError: string = '';

  isSubmitting: boolean = false;


  // =========================================================
  // FORMS
  // =========================================================

  addAssetForm: FormGroup;

  assignAssetForm: FormGroup;

  editAssetForm: FormGroup;


  // =========================================================
  // EMPLOYEES
  // =========================================================

  employees: EmployeeResponse[] = [];


  // =========================================================
  // ASSET TYPES
  // =========================================================

  assetTypes: string[] = [
    'LAPTOP',
    'DESKTOP',
    'MONITOR',
    'MOBILE',
    'TABLET',
    'PRINTER',
    'KEYBOARD',
    'MOUSE',
    'OTHER'
  ];


  // =========================================================
  // ASSET STATUSES
  // =========================================================

  assetStatuses: string[] = [
    'AVAILABLE',
    'ASSIGNED',
    'UNDER_MAINTENANCE',
    'RETIRED'
  ];


  // =========================================================
  // ASSET CONDITIONS
  // =========================================================

  assetConditions: string[] = [
    'NEW',
    'GOOD',
    'FAIR',
    'DAMAGED'
  ];


  // =========================================================
  // ASSETS
  // =========================================================

  assets: AssetUI[] = [

    {
      id: 1,

      assetName: 'MacBook Pro 16" M3',

      name: 'MacBook Pro 16" M3',

      type: 'LAPTOP',

      displayType: 'Laptop',

      serialNumber: 'MBP16-M3-001',

      serial: 'MBP16-M3-001',

      status: 'ASSIGNED',

      displayStatus: 'Assigned',

      assignedToName: 'Sarah Chen',

      assignedTo: 'Sarah Chen',

      assignedToId: 1,

      initials: 'SC',

      condition: 'GOOD',

      displayCondition: 'Good',

      purchaseValue: 2499,

      value: 2499,

      purchaseDate: null,

      notes: null,

      icon: 'laptop_mac'
    },

    {
      id: 2,

      assetName: 'Dell UltraSharp Monitor',

      name: 'Dell UltraSharp Monitor',

      type: 'MONITOR',

      displayType: 'Monitor',

      serialNumber: 'DELL-U2723-002',

      serial: 'DELL-U2723-002',

      status: 'AVAILABLE',

      displayStatus: 'Available',

      assignedToName: null,

      assignedTo: '—',

      assignedToId: null,

      initials: '',

      condition: 'GOOD',

      displayCondition: 'Good',

      purchaseValue: 699,

      value: 699,

      purchaseDate: null,

      notes: null,

      icon: 'monitor'
    },

    {
      id: 3,

      assetName: 'ThinkPad X1 Carbon',

      name: 'ThinkPad X1 Carbon',

      type: 'LAPTOP',

      displayType: 'Laptop',

      serialNumber: 'TP-X1C-003',

      serial: 'TP-X1C-003',

      status: 'ASSIGNED',

      displayStatus: 'Assigned',

      assignedToName: 'Marcus Johnson',

      assignedTo: 'Marcus Johnson',

      assignedToId: 2,

      initials: 'MJ',

      condition: 'GOOD',

      displayCondition: 'Good',

      purchaseValue: 1899,

      value: 1899,

      purchaseDate: null,

      notes: null,

      icon: 'laptop_mac'
    },

    {
      id: 4,

      assetName: 'iPhone 15 Pro',

      name: 'iPhone 15 Pro',

      type: 'MOBILE',

      displayType: 'Mobile',

      serialNumber: 'IPH15P-004',

      serial: 'IPH15P-004',

      status: 'AVAILABLE',

      displayStatus: 'Available',

      assignedToName: null,

      assignedTo: '—',

      assignedToId: null,

      initials: '',

      condition: 'NEW',

      displayCondition: 'New',

      purchaseValue: 999,

      value: 999,

      purchaseDate: null,

      notes: null,

      icon: 'smartphone'
    },

    {
      id: 5,

      assetName: 'Dell OptiPlex 7010',

      name: 'Dell OptiPlex 7010',

      type: 'DESKTOP',

      displayType: 'Desktop',

      serialNumber: 'DOPT7010-005',

      serial: 'DOPT7010-005',

      status: 'ASSIGNED',

      displayStatus: 'Assigned',

      assignedToName: 'David Kim',

      assignedTo: 'David Kim',

      assignedToId: 3,

      initials: 'DK',

      condition: 'GOOD',

      displayCondition: 'Good',

      purchaseValue: 1299,

      value: 1299,

      purchaseDate: null,

      notes: null,

      icon: 'desktop_windows'
    },

    {
      id: 6,

      assetName: 'HP LaserJet Pro',

      name: 'HP LaserJet Pro',

      type: 'PRINTER',

      displayType: 'Printer',

      serialNumber: 'HPLJ-006',

      serial: 'HPLJ-006',

      status: 'UNDER_MAINTENANCE',

      displayStatus: 'Under Maintenance',

      assignedToName: null,

      assignedTo: '—',

      assignedToId: null,

      initials: '',

      condition: 'FAIR',

      displayCondition: 'Fair',

      purchaseValue: 449,

      value: 449,

      purchaseDate: null,

      notes: null,

      icon: 'print'
    },

    {
      id: 7,

      assetName: 'iPad Pro 12.9"',

      name: 'iPad Pro 12.9"',

      type: 'TABLET',

      displayType: 'Tablet',

      serialNumber: 'IPADPRO-007',

      serial: 'IPADPRO-007',

      status: 'AVAILABLE',

      displayStatus: 'Available',

      assignedToName: null,

      assignedTo: '—',

      assignedToId: null,

      initials: '',

      condition: 'NEW',

      displayCondition: 'New',

      purchaseValue: 1099,

      value: 1099,

      purchaseDate: null,

      notes: null,

      icon: 'tablet'
    },

    {
      id: 8,

      assetName: 'Logitech MX Keys',

      name: 'Logitech MX Keys',

      type: 'KEYBOARD',

      displayType: 'Keyboard',

      serialNumber: 'MXKEYS-008',

      serial: 'MXKEYS-008',

      status: 'ASSIGNED',

      displayStatus: 'Assigned',

      assignedToName: 'Sarah Chen',

      assignedTo: 'Sarah Chen',

      assignedToId: 1,

      initials: 'SC',

      condition: 'GOOD',

      displayCondition: 'Good',

      purchaseValue: 119,

      value: 119,

      purchaseDate: null,

      notes: null,

      icon: 'keyboard'
    }

  ];


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private fb: FormBuilder,
    private assetsService: AssetsService,
    private employeeService: Employee,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {


    // =======================================================
    // ADD ASSET FORM
    // =======================================================

    this.addAssetForm = this.fb.group({

      assetName: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      type: [
        '',
        Validators.required
      ],

      serialNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      status: [
        'AVAILABLE',
        Validators.required
      ],

      condition: [
        'NEW',
        Validators.required
      ],

      purchaseDate: [
        null
      ],

      purchaseValue: [
        null,
        Validators.min(0)
      ],

      notes: [
        '',
        Validators.maxLength(500)
      ]

    });


    // =======================================================
    // ASSIGN ASSET FORM
    // =======================================================

    this.assignAssetForm = this.fb.group({

      employeeId: [
        '',
        Validators.required
      ]

    });


    // =======================================================
    // EDIT ASSET FORM
    // =======================================================

    this.editAssetForm = this.fb.group({

      assetName: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      type: [
        '',
        Validators.required
      ],

      serialNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      status: [
        '',
        Validators.required
      ],

      condition: [
        '',
        Validators.required
      ],

      purchaseDate: [
        null
      ],

      purchaseValue: [
        null,
        Validators.min(0)
      ],

      notes: [
        '',
        Validators.maxLength(500)
      ]

    });

  }


  // =========================================================
  // ON INIT
  // =========================================================

  ngOnInit(): void {

    this.loadAssets();

    this.loadEmployees();

  }


  // =========================================================
  // LOAD ASSETS
  // =========================================================

  loadAssets(): void {

    const token = this.auth.getToken();


    if (!token) {

      console.error(
        'No authentication token found.'
      );

      return;

    }


    this.assetsService
      .getAllAssets(token)
      .subscribe({

        next: (response: AssetResponse[]) => {

          this.assets =
            response.map(
              asset => this.mapBackendAsset(asset)
            );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading assets:',
            error
          );

        }

      });

  }


  // =========================================================
  // LOAD EMPLOYEES
  // =========================================================

  loadEmployees(): void {

    this.employeeService
      .getAllEmployees()
      .subscribe({

        next: (response: EmployeeResponse[]) => {

          this.employees = response;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading employees:',
            error
          );

        }

      });

  }


  // =========================================================
  // MAP BACKEND RESPONSE TO FRONTEND OBJECT
  // =========================================================

  private mapBackendAsset(
    asset: AssetResponse
  ): AssetUI {

    const displayType =
      this.displayAssetType(asset.type);

    const displayStatus =
      this.displayAssetStatus(asset.status);

    const displayCondition =
      this.displayAssetCondition(asset.condition);

    const assignedToName =
      asset.assignedToName || null;

    const purchaseValue =
      asset.purchaseValue ?? null;


    return {

      // =====================================================
      // IMPORTANT: PRESERVE DATABASE ID
      // =====================================================

      id: asset.id,


      // =====================================================
      // ASSET INFORMATION
      // =====================================================

      assetName:
        asset.assetName,

      name:
        asset.assetName,


      // =====================================================
      // TYPE
      // =====================================================

      type:
        asset.type,

      displayType:
        displayType,


      // =====================================================
      // SERIAL
      // =====================================================

      serialNumber:
        asset.serialNumber,

      serial:
        asset.serialNumber,


      // =====================================================
      // STATUS
      // =====================================================

      status:
        asset.status,

      displayStatus:
        displayStatus,


      // =====================================================
      // ASSIGNMENT
      // =====================================================

      assignedToName:
        assignedToName,

      assignedTo:
        assignedToName || '—',

      assignedToId:
        asset.assignedToId,

      initials:
        this.getInitials(
          asset.assignedToName
        ),


      // =====================================================
      // CONDITION
      // =====================================================

      condition:
        asset.condition,

      displayCondition:
        displayCondition,


      // =====================================================
      // PURCHASE INFORMATION
      // =====================================================

      purchaseValue:
        purchaseValue,

      value:
        purchaseValue ?? 0,

      purchaseDate:
        asset.purchaseDate,


      // =====================================================
      // NOTES
      // =====================================================

      notes:
        asset.notes,


      // =====================================================
      // ICON
      // =====================================================

      icon:
        this.getAssetIcon(asset.type)

    };

  }


  // =========================================================
  // FILTERED ASSETS
  // =========================================================

  get filteredAssets(): AssetUI[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();


    return this.assets.filter(
      asset => {

        const matchesSearch =
          !search ||

          asset.assetName
            .toLowerCase()
            .includes(search) ||

          asset.serialNumber
            .toLowerCase()
            .includes(search) ||

          (
            asset.assignedToName || ''
          )
            .toLowerCase()
            .includes(search);


        const matchesType =
          this.selectedType === 'All Types' ||

          asset.type ===
            this.selectedType;


        const matchesStatus =
          this.selectedStatus === 'All Statuses' ||

          asset.status ===
            this.selectedStatus;


        return (
          matchesSearch &&
          matchesType &&
          matchesStatus
        );

      }
    );

  }


  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  clearFilters(): void {

    this.searchText = '';

    this.selectedType =
      'All Types';

    this.selectedStatus =
      'All Statuses';

  }


  // =========================================================
  // ADD ASSET MODAL
  // =========================================================

  openAddAssetModal(): void {

    this.submitError = '';

    this.isSubmitting = false;


    this.addAssetForm.reset({

      assetName: '',

      type: '',

      serialNumber: '',

      status: 'AVAILABLE',

      condition: 'NEW',

      purchaseDate: null,

      purchaseValue: null,

      notes: ''

    });


    this.showAddModal = true;

  }


  // =========================================================
  // CLOSE ADD MODAL
  // =========================================================

  closeAddAssetModal(): void {

    this.showAddModal = false;

    this.submitError = '';

    this.isSubmitting = false;

  }


  // =========================================================
  // SUBMIT ADD ASSET
  // =========================================================

  submitAddAsset(): void {

    if (
      this.addAssetForm.invalid
    ) {

      this.addAssetForm.markAllAsTouched();

      return;

    }


    const token =
      this.auth.getToken();


    if (!token) {

      this.submitError =
        'Authentication token not found. Please login again.';

      return;

    }


    this.isSubmitting = true;

    this.submitError = '';


    const formValue =
      this.addAssetForm.value;


    const request: AssetRequest = {

      assetName:
        formValue.assetName,

      type:
        formValue.type,

      serialNumber:
        formValue.serialNumber,

      status:
        formValue.status,

      condition:
        formValue.condition,

      purchaseDate:
        formValue.purchaseDate || null,

      purchaseValue:
        formValue.purchaseValue !== null &&
        formValue.purchaseValue !== ''
          ? Number(formValue.purchaseValue)
          : null,

      notes:
        formValue.notes || null

    };


    this.assetsService
      .createAsset(
        request,
        token
      )
      .subscribe({

        next: (
          response: AssetResponse
        ) => {

          this.assets.push(
            this.mapBackendAsset(response)
          );

          this.closeAddAssetModal();

          this.cdr.detectChanges();

        },

        error: (error) => {

          this.isSubmitting = false;


          console.error(
            'Error creating asset:',
            error
          );


          this.submitError =
            error?.error?.message ||
            'Failed to create asset.';

        }

      });

  }


  // =========================================================
  // ASSIGN ASSET MODAL
  // =========================================================

  assignAsset(
    asset: AssetUI
  ): void {

    this.selectedAsset =
      asset;

    this.actionError = '';


    this.assignAssetForm.reset({

      employeeId:
        asset.assignedToId || ''

    });


    this.showAssignModal =
      true;

  }


  // =========================================================
  // CLOSE ASSIGN MODAL
  // =========================================================

  closeAssignModal(): void {

    this.showAssignModal = false;

    this.selectedAsset = null;

    this.actionError = '';

    this.assignAssetForm.reset();

  }


  // =========================================================
  // SUBMIT ASSIGN ASSET
  // =========================================================

  submitAssignAsset(): void {

    if (
      this.assignAssetForm.invalid ||
      !this.selectedAsset
    ) {

      this.assignAssetForm.markAllAsTouched();

      return;

    }


    const token =
      this.auth.getToken();


    if (!token) {

      this.actionError =
        'Authentication token not found. Please login again.';

      return;

    }


    const employeeId =
      Number(
        this.assignAssetForm.value.employeeId
      );


    const assetId =
      this.selectedAsset.id;


    this.assetsService
      .assignAsset(
        assetId,
        employeeId,
        token
      )
      .subscribe({

        next: (
          response: AssetResponse
        ) => {

          this.updateAssetInTable(
            response
          );

          this.closeAssignModal();

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error assigning asset:',
            error
          );


          this.actionError =
            error?.error?.message ||
            'Failed to assign asset.';

        }

      });

  }


  // =========================================================
  // UNASSIGN ASSET
  // =========================================================

  unassignAsset(
    asset: AssetUI
  ): void {

    if (!asset.id) {

      return;

    }


    const token =
      this.auth.getToken();


    if (!token) {

      console.error(
        'No authentication token found.'
      );

      return;

    }


    this.assetsService
      .unassignAsset(
        asset.id,
        token
      )
      .subscribe({

        next: (
          response: AssetResponse
        ) => {

          this.updateAssetInTable(
            response
          );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error unassigning asset:',
            error
          );

        }

      });

  }


  // =========================================================
  // EDIT ASSET MODAL
  // =========================================================

  editAsset(
    asset: AssetUI
  ): void {

    this.selectedAsset =
      asset;

    this.actionError = '';


    this.editAssetForm.patchValue({

      assetName:
        asset.assetName,

      type:
        asset.type,

      serialNumber:
        asset.serialNumber,

      status:
        asset.status,

      condition:
        asset.condition,

      purchaseDate:
        asset.purchaseDate,

      purchaseValue:
        asset.purchaseValue,

      notes:
        asset.notes

    });


    this.showEditModal =
      true;

  }


  // =========================================================
  // CLOSE EDIT MODAL
  // =========================================================

  closeEditModal(): void {

    this.showEditModal = false;

    this.selectedAsset = null;

    this.actionError = '';

    this.editAssetForm.reset();

  }


  // =========================================================
  // SUBMIT EDIT ASSET
  // =========================================================

  submitEditAsset(): void {

    if (
      this.editAssetForm.invalid ||
      !this.selectedAsset
    ) {

      this.editAssetForm.markAllAsTouched();

      return;

    }


    const token =
      this.auth.getToken();


    if (!token) {

      this.actionError =
        'Authentication token not found. Please login again.';

      return;

    }


    const formValue =
      this.editAssetForm.value;


    const request: AssetRequest = {

      assetName:
        formValue.assetName,

      type:
        formValue.type,

      serialNumber:
        formValue.serialNumber,

      status:
        formValue.status,

      condition:
        formValue.condition,

      purchaseDate:
        formValue.purchaseDate || null,

      purchaseValue:
        formValue.purchaseValue !== null &&
        formValue.purchaseValue !== ''
          ? Number(formValue.purchaseValue)
          : null,

      notes:
        formValue.notes || null

    };


    // IMPORTANT:
    // Use the actual database ID

    const assetId =
      this.selectedAsset.id;


    this.assetsService
      .updateAsset(
        assetId,
        request,
        token
      )
      .subscribe({

        next: (
          response: AssetResponse
        ) => {

          this.updateAssetInTable(
            response
          );

          this.closeEditModal();

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error updating asset:',
            error
          );


          this.actionError =
            error?.error?.message ||
            'Failed to update asset.';

        }

      });

  }


  // =========================================================
  // DELETE ASSET MODAL
  // =========================================================

  deleteAsset(
    asset: AssetUI
  ): void {

    this.selectedAsset =
      asset;

    this.actionError = '';

    this.showDeleteModal =
      true;

  }


  // =========================================================
  // CLOSE DELETE MODAL
  // =========================================================

  closeDeleteModal(): void {

    this.showDeleteModal = false;

    this.selectedAsset = null;

    this.actionError = '';

  }


  // =========================================================
  // CONFIRM DELETE
  // =========================================================

  confirmDeleteAsset(): void {

    if (!this.selectedAsset) {

      return;

    }


    const token =
      this.auth.getToken();


    if (!token) {

      this.actionError =
        'Authentication token not found. Please login again.';

      return;

    }


    // IMPORTANT:
    // Get the real database ID

    const assetId =
      this.selectedAsset.id;


    this.assetsService
      .deleteAsset(
        assetId,
        token
      )
      .subscribe({

        next: () => {

          this.assets =
            this.assets.filter(
              asset =>
                asset.id !== assetId
            );


          this.closeDeleteModal();

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error deleting asset:',
            error
          );


          this.actionError =
            error?.error?.message ||
            'Failed to delete asset.';

        }

      });

  }


  // =========================================================
  // UPDATE ASSET IN TABLE
  // =========================================================

  private updateAssetInTable(
    response: AssetResponse
  ): void {

    const index =
      this.assets.findIndex(
        asset =>
          asset.id === response.id
      );


    if (index === -1) {

      return;

    }


    this.assets[index] =
      this.mapBackendAsset(
        response
      );

  }


  // =========================================================
  // DISPLAY TYPE
  // =========================================================

  displayAssetType(
    type: string
  ): string {

    if (!type) {

      return '';

    }


    return type
      .toLowerCase()
      .replace(
        /_/g,
        ' '
      )
      .replace(
        /\b\w/g,
        char =>
          char.toUpperCase()
      );

  }


  // =========================================================
  // DISPLAY STATUS
  // =========================================================

  displayAssetStatus(
    status: string
  ): string {

    if (!status) {

      return '';

    }


    return status
      .toLowerCase()
      .replace(
        /_/g,
        ' '
      )
      .replace(
        /\b\w/g,
        char =>
          char.toUpperCase()
      );

  }


  // =========================================================
  // DISPLAY CONDITION
  // =========================================================

  displayAssetCondition(
    condition: string
  ): string {

    if (!condition) {

      return '';

    }


    return condition
      .toLowerCase()
      .replace(
        /_/g,
        ' '
      )
      .replace(
        /\b\w/g,
        char =>
          char.toUpperCase()
      );

  }


  // =========================================================
  // METHODS REQUIRED BY EXISTING HTML
  // =========================================================

  getDisplayType(
    type: string
  ): string {

    return this.displayAssetType(
      type
    );

  }


  getDisplayStatus(
    status: string
  ): string {

    return this.displayAssetStatus(
      status
    );

  }


  getDisplayCondition(
    condition: string
  ): string {

    return this.displayAssetCondition(
      condition
    );

  }


  // =========================================================
  // GET INITIALS
  // =========================================================

  getInitials(
    name: string | null
  ): string {

    if (!name) {

      return '';

    }


    const parts =
      name
        .trim()
        .split(/\s+/);


    if (parts.length === 1) {

      return parts[0]
        .substring(0, 2)
        .toUpperCase();

    }


    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();

  }


  // =========================================================
  // ASSET ICON
  // =========================================================

  getAssetIcon(
    type: string
  ): string {

    switch (type) {

      case 'LAPTOP':
        return 'laptop_mac';

      case 'DESKTOP':
        return 'desktop_windows';

      case 'MONITOR':
        return 'monitor';

      case 'MOBILE':
        return 'smartphone';

      case 'TABLET':
        return 'tablet';

      case 'PRINTER':
        return 'print';

      case 'KEYBOARD':
        return 'keyboard';

      case 'MOUSE':
        return 'mouse';

      default:
        return 'devices_other';

    }

  }


  // =========================================================
  // STATUS CLASS
  // =========================================================

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Available':
        return 'status-available';

      case 'Assigned':
        return 'status-assigned';

      case 'Under Maintenance':
        return 'status-maintenance';

      case 'Retired':
        return 'status-retired';

      default:
        return '';

    }

  }


  // =========================================================
  // CONDITION CLASS
  // =========================================================

  getConditionClass(
    condition: string
  ): string {

    switch (condition) {

      case 'New':
        return 'condition-new';

      case 'Good':
        return 'condition-good';

      case 'Fair':
        return 'condition-fair';

      case 'Damaged':
        return 'condition-damaged';

      default:
        return '';

    }

  }


  // =========================================================
  // FORMAT DATE
  // =========================================================

  formatDate(
    date: string | null
  ): string {

    if (!date) {

      return '-';

    }


    const parsedDate =
      new Date(date);


    if (
      isNaN(
        parsedDate.getTime()
      )
    ) {

      return date;

    }


    return parsedDate.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );

  }


  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  formatCurrency(
    value: number | null
  ): string {

    if (
      value === null ||
      value === undefined
    ) {

      return '-';

    }


    return new Intl.NumberFormat(
      'en-IN',
      {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
      }
    ).format(value);

  }

}