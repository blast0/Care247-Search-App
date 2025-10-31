import { useState, useEffect } from "react";
import { ConfigForm } from "./components/custom/ConfigForm";
import { ResultsTable } from "./components/custom/ResultsTable";
import { searchFields, resultFields } from "./config/searchConfig";
import { searchCustomers } from "./api/customers";
import type { Customer, SearchParams } from "./types";

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(params: SearchParams) {
    setLoading(true);
    setError(null);
    try {
      const res = await searchCustomers(params);
      setCustomers(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch({});
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Search (config-driven)</h1>

      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Search Filters</h2>
        <ConfigForm fields={searchFields} onSearch={handleSearch} />
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Results</h2>
        <ResultsTable
          customers={customers}
          loading={loading}
          error={error}
          resultFields={resultFields}
        />
      </section>
    </div>
  );
}
