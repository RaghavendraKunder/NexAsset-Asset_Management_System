import { Component } from '@angular/core';

interface HistoryEvent {
  action: string;
  assetName: string;
  description: string;
  date: string;
  time: string;
  icon: string;
  iconClass: string;
}

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {

  searchText: string = '';

  selectedAction: string = 'All Actions';


  historyEvents: HistoryEvent[] = [

    {
      action: 'Created',
      assetName: 'MacBook Pro 16" M3',
      description: 'Asset added to inventory',
      date: 'Aug 25, 2026',
      time: '06:36 PM',
      icon: 'add',
      iconClass: 'created'
    },

    {
      action: 'Created',
      assetName: 'MacBook Pro 14" M2',
      description: 'Asset added to inventory',
      date: 'Aug 25, 2026',
      time: '06:36 PM',
      icon: 'add',
      iconClass: 'created'
    },

    {
      action: 'Created',
      assetName: 'Dell UltraSharp 32" 4K',
      description: 'Asset added to inventory',
      date: 'Aug 25, 2026',
      time: '06:36 PM',
      icon: 'add',
      iconClass: 'created'
    },

    {
      action: 'Created',
      assetName: 'LG UltraFine 27"',
      description: 'Asset added to inventory',
      date: 'Aug 25, 2026',
      time: '06:36 PM',
      icon: 'add',
      iconClass: 'created'
    },

    {
      action: 'Created',
      assetName: 'Keychron K2 Mechanical',
      description: 'Asset added to inventory',
      date: 'Aug 25, 2026',
      time: '06:36 PM',
      icon: 'add',
      iconClass: 'created'
    },

    {
      action: 'Created',
      assetName: 'Logitech MX Master 3S',
      description: 'Asset added to inventory',
      date: 'Aug 25, 2026',
      time: '06:36 PM',
      icon: 'add',
      iconClass: 'created'
    },

    {
      action: 'Assigned',
      assetName: 'Dell UltraSharp 32" 4K',
      description: 'Assigned to Marcus Johnson',
      date: 'Aug 25, 2026',
      time: '05:42 PM',
      icon: 'swap_horiz',
      iconClass: 'assigned'
    },

    {
      action: 'Assigned',
      assetName: 'MacBook Pro 16" M3',
      description: 'Assigned to Sarah Chen',
      date: 'Aug 25, 2026',
      time: '05:30 PM',
      icon: 'swap_horiz',
      iconClass: 'assigned'
    },

    {
      action: 'Updated',
      assetName: 'MacBook Pro 14" M2',
      description: 'Asset information updated',
      date: 'Aug 25, 2026',
      time: '04:18 PM',
      icon: 'edit',
      iconClass: 'updated'
    },

    {
      action: 'Returned',
      assetName: 'iPhone 15 Pro',
      description: 'Returned by David Kim',
      date: 'Aug 24, 2026',
      time: '03:10 PM',
      icon: 'keyboard_return',
      iconClass: 'returned'
    },

    {
      action: 'Repair',
      assetName: 'LG UltraFine 27"',
      description: 'Asset marked as under repair',
      date: 'Aug 24, 2026',
      time: '11:25 AM',
      icon: 'build',
      iconClass: 'repair'
    }

  ];


  get filteredHistory(): HistoryEvent[] {

    const search = this.searchText
      .toLowerCase()
      .trim();

    return this.historyEvents.filter(event => {

      const matchesAction =
        this.selectedAction === 'All Actions' ||
        event.action === this.selectedAction;

      const matchesSearch =
        !search ||
        event.assetName
          .toLowerCase()
          .includes(search) ||
        event.action
          .toLowerCase()
          .includes(search) ||
        event.description
          .toLowerCase()
          .includes(search);

      return matchesAction && matchesSearch;

    });

  }


  onActionChange(): void {

    console.log(
      'Selected action:',
      this.selectedAction
    );

  }

}
