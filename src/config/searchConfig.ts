export const searchFields = [
  { key: 'firstName', uiType: 'input', label: 'First Name', placeholder: 'e.g. John', renderOrder: 1, queryParam: 'firstName' },
  { key: 'lastName', uiType: 'input', label: 'Last Name', placeholder: 'e.g. Smith', renderOrder: 2, queryParam: 'lastName' },
  { key: 'dateOfBirth', uiType: 'date', label: 'Date of Birth', renderOrder: 3, queryParam: 'dateOfBirth' }
];
export const resultFields = [
  { key: 'name', label: 'Name' },
  { key: 'dateOfBirth', label: 'DOB' },
  { key: 'primaryPhone', label: 'Primary Phone' },
  { key: 'primaryEmail', label: 'Primary Email' }
];