export interface SearchField {
  key: string;
  uiType: "input" | "date";
  label: string;
  placeholder?: string;
  renderOrder: number;
  queryParam?: string;
}

export interface ResultField {
  key: string;
  label: string;
}

export const searchFields: SearchField[] = [
  { key: "firstName", uiType: "input", label: "First Name", placeholder: "e.g. John", renderOrder: 1, queryParam: "firstName" },
  { key: "lastName", uiType: "input", label: "Last Name", placeholder: "e.g. Smith", renderOrder: 2, queryParam: "lastName" },
  { key: "dateOfBirth", uiType: "date", label: "Date of Birth", renderOrder: 3, queryParam: "dateOfBirth" }
];

export const resultFields: ResultField[] = [
  { key: "name", label: "Name" },
  { key: "dateOfBirth", label: "DOB" },
  { key: "primaryPhone", label: "Primary Phone" },
  { key: "primaryEmail", label: "Primary Email" }
];
