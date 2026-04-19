// Mock data for Admin Dashboard

// Aligned with backend entities and statuses



// Resource types and statuses

export const RESOURCE_TYPES = {

  LECTURE_HALL: 'Lecture Hall',

  LAB: 'Lab',

  MEETING_ROOM: 'Meeting Room',

  EQUIPMENT: 'Equipment'

};



export const RESOURCE_STATUS = {

  ACTIVE: 'ACTIVE',

  OUT_OF_SERVICE: 'OUT_OF_SERVICE'

};



// Booking statuses

export const BOOKING_STATUS = {

  PENDING: 'PENDING',

  APPROVED: 'APPROVED',

  REJECTED: 'REJECTED',

  CANCELLED: 'CANCELLED'

};



// Ticket categories, priorities, and statuses

export const TICKET_CATEGORY = {

  MAINTENANCE: 'MAINTENANCE',

  INCIDENT: 'INCIDENT',

  REPAIR: 'REPAIR',

  CLEANING: 'CLEANING',

  OTHER: 'OTHER'

};



export const TICKET_PRIORITY = {

  LOW: 'LOW',

  MEDIUM: 'MEDIUM',

  HIGH: 'HIGH',

  URGENT: 'URGENT'

};



export const TICKET_STATUS = {

  OPEN: 'OPEN',

  IN_PROGRESS: 'IN_PROGRESS',

  RESOLVED: 'RESOLVED',

  CLOSED: 'CLOSED',

  REJECTED: 'REJECTED'

};



// Notification types

export const NOTIFICATION_TYPE = {

  BOOKING_APPROVED: 'BOOKING_APPROVED',

  BOOKING_REJECTED: 'BOOKING_REJECTED',

  BOOKING_CANCELLED: 'BOOKING_CANCELLED',

  TICKET_STATUS_CHANGED: 'TICKET_STATUS_CHANGED',

  TICKET_COMMENT_ADDED: 'TICKET_COMMENT_ADDED',

  TICKET_ASSIGNED: 'TICKET_ASSIGNED'

};



// Summary stats

export const adminStats = {

  totalResources: 45,

  activeResources: 38,

  outOfServiceResources: 7,

  totalBookings: 234,

  pendingBookings: 12,

  approvedBookings: 198,

  rejectedBookings: 15,

  cancelledBookings: 9,

  totalTickets: 87,

  openTickets: 23,

  inProgressTickets: 34,

  resolvedTickets: 25,

  closedTickets: 3,

  rejectedTickets: 2,

  unreadNotifications: 8

};



// Recent bookings

export const recentBookings = [

  {

    id: 1,

    bookingCode: 'BK-2024-001',

    resource: 'Lecture Hall A',

    resourceType: RESOURCE_TYPES.LECTURE_HALL,

    bookingDate: '2024-04-18',

    startTime: '09:00',

    endTime: '11:00',

    status: BOOKING_STATUS.PENDING,

    user: 'John Doe',

    userEmail: 'john.doe@example.com',

    createdAt: '2024-04-17T10:30:00Z'

  },

  {

    id: 2,

    bookingCode: 'BK-2024-002',

    resource: 'Computer Lab 1',

    resourceType: RESOURCE_TYPES.LAB,

    bookingDate: '2024-04-18',

    startTime: '14:00',

    endTime: '16:00',

    status: BOOKING_STATUS.PENDING,

    user: 'Jane Smith',

    userEmail: 'jane.smith@example.com',

    createdAt: '2024-04-17T11:15:00Z'

  },

  {

    id: 3,

    bookingCode: 'BK-2024-003',

    resource: 'Meeting Room B',

    resourceType: RESOURCE_TYPES.MEETING_ROOM,

    bookingDate: '2024-04-17',

    startTime: '10:00',

    endTime: '12:00',

    status: BOOKING_STATUS.APPROVED,

    user: 'Bob Johnson',

    userEmail: 'bob.johnson@example.com',

    createdAt: '2024-04-16T15:45:00Z'

  },

  {

    id: 4,

    bookingCode: 'BK-2024-004',

    resource: 'Projector Equipment',

    resourceType: RESOURCE_TYPES.EQUIPMENT,

    bookingDate: '2024-04-19',

    startTime: '09:00',

    endTime: '17:00',

    status: BOOKING_STATUS.PENDING,

    user: 'Alice Williams',

    userEmail: 'alice.williams@example.com',

    createdAt: '2024-04-17T09:20:00Z'

  },

  {

    id: 5,

    bookingCode: 'BK-2024-005',

    resource: 'Lecture Hall B',

    resourceType: RESOURCE_TYPES.LECTURE_HALL,

    bookingDate: '2024-04-17',

    startTime: '13:00',

    endTime: '15:00',

    status: BOOKING_STATUS.REJECTED,

    user: 'Charlie Brown',

    userEmail: 'charlie.brown@example.com',

    createdAt: '2024-04-16T14:30:00Z'

  }

];



// Recent tickets

export const recentTickets = [

  {

    id: 1,

    ticketCode: 'TK-2024-001',

    category: TICKET_CATEGORY.MAINTENANCE,

    priority: TICKET_PRIORITY.HIGH,

    status: TICKET_STATUS.OPEN,

    title: 'Air conditioning not working in Lecture Hall A',

    createdBy: 'John Doe',

    createdByEmail: 'john.doe@example.com',

    assignedTo: 'Admin User',

    assignedToEmail: 'admin@example.com',

    createdAt: '2024-04-17T08:30:00Z'

  },

  {

    id: 2,

    ticketCode: 'TK-2024-002',

    category: TICKET_CATEGORY.INCIDENT,

    priority: TICKET_PRIORITY.URGENT,

    status: TICKET_STATUS.IN_PROGRESS,

    title: 'Water leak in Lab 3',

    createdBy: 'Jane Smith',

    createdByEmail: 'jane.smith@example.com',

    assignedTo: 'Maintenance Team',

    assignedToEmail: 'maintenance@example.com',

    createdAt: '2024-04-16T16:45:00Z'

  },

  {

    id: 3,

    ticketCode: 'TK-2024-003',

    category: TICKET_CATEGORY.REPAIR,

    priority: TICKET_PRIORITY.MEDIUM,

    status: TICKET_STATUS.OPEN,

    title: 'Projector bulb replacement needed in Meeting Room A',

    createdBy: 'Bob Johnson',

    createdByEmail: 'bob.johnson@example.com',

    assignedTo: null,

    assignedToEmail: null,

    createdAt: '2024-04-17T10:15:00Z'

  },

  {

    id: 4,

    ticketCode: 'TK-2024-004',

    category: TICKET_CATEGORY.CLEANING,

    priority: TICKET_PRIORITY.LOW,

    status: TICKET_STATUS.RESOLVED,

    title: 'Request cleaning for Lab 2 after event',

    createdBy: 'Alice Williams',

    createdByEmail: 'alice.williams@example.com',

    assignedTo: 'Cleaning Staff',

    assignedToEmail: 'cleaning@example.com',

    createdAt: '2024-04-15T14:00:00Z'

  },

  {

    id: 5,

    ticketCode: 'TK-2024-005',

    category: TICKET_CATEGORY.OTHER,

    priority: TICKET_PRIORITY.HIGH,

    status: TICKET_STATUS.IN_PROGRESS,

    title: 'Network connectivity issues in Computer Lab 2',

    createdBy: 'Charlie Brown',

    createdByEmail: 'charlie.brown@example.com',

    assignedTo: 'IT Support',

    assignedToEmail: 'it@example.com',

    createdAt: '2024-04-16T09:30:00Z'

  }

];



// Resource status summary

export const resourceStatusSummary = [

  { type: RESOURCE_TYPES.LECTURE_HALL, total: 12, active: 11, outOfService: 1 },

  { type: RESOURCE_TYPES.LAB, total: 18, active: 15, outOfService: 3 },

  { type: RESOURCE_TYPES.MEETING_ROOM, total: 8, active: 7, outOfService: 1 },

  { type: RESOURCE_TYPES.EQUIPMENT, total: 7, active: 5, outOfService: 2 }

];



// Notifications

export const notifications = [

  {

    id: 1,

    type: NOTIFICATION_TYPE.BOOKING_APPROVED,

    title: 'Booking Approved',

    message: 'Booking BK-2024-003 for Meeting Room B has been approved',

    relatedItem: 'BK-2024-003',

    relatedItemType: 'booking',

    isRead: false,

    createdAt: '2024-04-17T11:00:00Z'

  },

  {

    id: 2,

    type: NOTIFICATION_TYPE.TICKET_ASSIGNED,

    title: 'Ticket Assigned',

    message: 'Ticket TK-2024-002 has been assigned to Maintenance Team',

    relatedItem: 'TK-2024-002',

    relatedItemType: 'ticket',

    isRead: false,

    createdAt: '2024-04-17T10:30:00Z'

  },

  {

    id: 3,

    type: NOTIFICATION_TYPE.BOOKING_CANCELLED,

    title: 'Booking Cancelled',

    message: 'Booking BK-2024-006 has been cancelled by the user',

    relatedItem: 'BK-2024-006',

    relatedItemType: 'booking',

    isRead: false,

    createdAt: '2024-04-17T09:45:00Z'

  },

  {

    id: 4,

    type: NOTIFICATION_TYPE.TICKET_STATUS_CHANGED,

    title: 'Ticket Status Updated',

    message: 'Ticket TK-2024-004 status changed to RESOLVED',

    relatedItem: 'TK-2024-004',

    relatedItemType: 'ticket',

    isRead: true,

    createdAt: '2024-04-16T18:00:00Z'

  },

  {

    id: 5,

    type: NOTIFICATION_TYPE.BOOKING_PENDING,

    title: 'New Booking Request',

    message: 'New booking request BK-2024-007 for Lecture Hall A',

    relatedItem: 'BK-2024-007',

    relatedItemType: 'booking',

    isRead: false,

    createdAt: '2024-04-17T08:15:00Z'

  }

];



// Activity feed

export const activityFeed = [

  {

    id: 1,

    action: 'Booking Approved',

    description: 'Admin approved booking BK-2024-003 for Meeting Room B',

    actor: 'Admin User',

    actorEmail: 'admin@example.com',

    timestamp: '2024-04-17T11:00:00Z'

  },

  {

    id: 2,

    action: 'Ticket Assigned',

    description: 'Ticket TK-2024-002 assigned to Maintenance Team',

    actor: 'Admin User',

    actorEmail: 'admin@example.com',

    timestamp: '2024-04-17T10:30:00Z'

  },

  {

    id: 3,

    action: 'Resource Updated',

    description: 'Lecture Hall A marked as OUT_OF_SERVICE for maintenance',

    actor: 'Admin User',

    actorEmail: 'admin@example.com',

    timestamp: '2024-04-17T09:00:00Z'

  },

  {

    id: 4,

    action: 'Ticket Resolved',

    description: 'Ticket TK-2024-004 marked as RESOLVED by Admin',

    actor: 'Admin User',

    actorEmail: 'admin@example.com',

    timestamp: '2024-04-16T18:00:00Z'

  },

  {

    id: 5,

    action: 'Booking Rejected',

    description: 'Admin rejected booking BK-2024-005 due to conflict',

    actor: 'Admin User',

    actorEmail: 'admin@example.com',

    timestamp: '2024-04-16T14:30:00Z'

  }

];



// Quick actions

export const quickActions = [

  {

    id: 1,

    title: 'Manage Resources',

    description: 'View and manage all campus resources',

    icon: '📦',

    route: '/admin/resources',

    color: 'blue'

  },

  {

    id: 2,

    title: 'Review Bookings',

    description: 'Review and approve/reject pending bookings',

    icon: '📅',

    route: '/admin/manage-bookings',

    color: 'green'

  },

  {

    id: 3,

    title: 'View All Tickets',

    description: 'Manage and track support tickets',

    icon: '🎫',

    route: '/admin/tickets',

    color: 'orange'

  },

  {

    id: 4,

    title: 'Create Resource',

    description: 'Add a new resource to the system',

    icon: '➕',

    route: '/admin/resources/create',

    color: 'purple'

  },

  {

    id: 5,

    title: 'View Notifications',

    description: 'Check system notifications',

    icon: '🔔',

    route: '/admin/notifications',

    color: 'red'

  }

];

