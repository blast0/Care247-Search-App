import React from 'react';
import type { Customer } from '../../types';
import { Spinner } from "@/components/ui/spinner";

interface ResultsTableProps {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  resultFields: { key: string; label: string }[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  customers,
  loading,
  error,
  resultFields,
}) => {
  // Handle loading, error, and empty states
  if (loading) {
    return <div className="flex p-4"><Spinner/> Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!customers.length) {
    return <div className="p-4">No customers found.</div>;
  }

  // Helper function to get display values safely
  const getValue = (customer: any, key: string): string => {
    switch (key) {
      case 'name':
        return `${customer.firstName} ${customer.lastName}`;

      case 'dateOfBirth':
        return customer.dateOfBirth || '-';

      case 'primaryPhone': {
        const primaryPhone =
          customer.phones.find((p: any) => p.isPrimary)?.number ||
          customer.phones[0]?.number;
        return primaryPhone || '-';
      }

      case 'primaryEmail': {
        const primaryEmail =
          customer.emails.find((e: any) => e.isPrimary)?.address ||
          customer.emails[0]?.address;
        return primaryEmail || '-';
      }

      default:
        return customer[key] || '-';
    }
  };

  // Render the results table
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {resultFields.map((field) => (
              <th
                key={field.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {field.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr key={customer.id}>
              {resultFields.map((field) => (
                <td
                  key={field.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {getValue(customer, field.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
