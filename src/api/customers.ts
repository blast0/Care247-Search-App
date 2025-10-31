import type { Customer } from '../types';
const BASE_URL = 'http://localhost:3001'; 

export async function searchCustomers(params: Record<string, string | undefined>): Promise<Customer[]> {

  const queryString = Object.entries(params)
    .filter(([key, value]) => value !== undefined && value !== '') // remove empty or undefined values
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join('&');

  const url = `${BASE_URL}/customers${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch customers. Status: ${response.status}`);
  }

  const customers: Customer[] = await response.json();

  return customers;
}
