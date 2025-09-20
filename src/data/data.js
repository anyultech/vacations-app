export const VacationRequestList = [
  {
    id: '1',
    from: '12/09/2024',
    to: '12/09/2025',
    state: 'approved',
    observations: '',
    createdAt: '',
    user: 'user_1',
  },
  { id: '2', from: '12/09/2024', to: '12/09/2025', state: 'pending' },
  { id: '3', from: '12/09/2024', to: '12/09/2025', state: 'declined' },
  { id: '4', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '5', from: '12/09/2024', to: '12/09/2025', state: 'declined' },
  { id: '6', from: '12/09/2024', to: '12/09/2025', state: 'declined' },
  { id: '7', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '8', from: '12/09/2024', to: '12/09/2025', state: 'declined' },
  { id: '9', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '10', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '11', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '12', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
];

export const UserVacations = [
  {
    id: '1',
    user: 'user_1',
    approved: 4,
    pending: 5,
    remaining: 6,
    declined: 0,
  },
];

export const Users = [
  { id: 1, username: 'user_1', fullName: 'Anyul Rey Moreno', role: 'employee' },
];

export const Parameters = [
  { id: 1, name: 'initialDays', value: 15 },
  { id: 2, name: 'currentYear', value: 2025 },
];
