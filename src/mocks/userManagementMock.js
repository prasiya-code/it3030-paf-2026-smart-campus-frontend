// Mock data for User Management
// Aligned with backend user roles

// User roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  TECHNICIAN: 'TECHNICIAN',
  ACADEMIC_STAFF: 'ACADEMIC_STAFF'
};

// User status
export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED'
};

// Mock users
export const users = [
  {
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: USER_ROLES.ADMIN,
    status: USER_STATUS.ACTIVE,
    department: 'IT Operations',
    createdAt: '2024-01-15T00:00:00Z',
    lastLogin: '2024-04-17T10:30:00Z'
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: USER_ROLES.STUDENT,
    status: USER_STATUS.ACTIVE,
    department: 'Computer Science',
    createdAt: '2024-02-10T00:00:00Z',
    lastLogin: '2024-04-17T09:15:00Z'
  },
  {
    id: 3,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: USER_ROLES.ACADEMIC_STAFF,
    status: USER_STATUS.ACTIVE,
    department: 'Engineering',
    createdAt: '2024-01-20T00:00:00Z',
    lastLogin: '2024-04-16T16:45:00Z'
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: USER_ROLES.TECHNICIAN,
    status: USER_STATUS.ACTIVE,
    department: 'Maintenance',
    createdAt: '2024-03-05T00:00:00Z',
    lastLogin: '2024-04-17T08:00:00Z'
  },
  {
    id: 5,
    firstName: 'Alice',
    lastName: 'Williams',
    email: 'alice.williams@example.com',
    role: USER_ROLES.STUDENT,
    status: USER_STATUS.INACTIVE,
    department: 'Mathematics',
    createdAt: '2024-02-28T00:00:00Z',
    lastLogin: '2024-03-15T14:20:00Z'
  },
  {
    id: 6,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    role: USER_ROLES.STUDENT,
    status: USER_STATUS.SUSPENDED,
    department: 'Physics',
    createdAt: '2024-01-25T00:00:00Z',
    lastLogin: '2024-04-01T11:30:00Z'
  },
  {
    id: 7,
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@example.com',
    role: USER_ROLES.TECHNICIAN,
    status: USER_STATUS.ACTIVE,
    department: 'IT Support',
    createdAt: '2024-03-15T00:00:00Z',
    lastLogin: '2024-04-17T07:45:00Z'
  },
  {
    id: 8,
    firstName: 'Sarah',
    lastName: 'Miller',
    email: 'sarah.miller@example.com',
    role: USER_ROLES.ACADEMIC_STAFF,
    status: USER_STATUS.ACTIVE,
    department: 'Biology',
    createdAt: '2024-02-20T00:00:00Z',
    lastLogin: '2024-04-16T17:30:00Z'
  }
];
