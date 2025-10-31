import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SearchField } from "../../config/searchConfig";
import type { SearchParams } from "../../types";

interface ConfigFormProps {
  fields: SearchField[];
  onSearch: (params: SearchParams) => void;
}

export const ConfigForm = ({ fields, onSearch }: ConfigFormProps) => {
  const sorted = [...fields].sort((a, b) => a.renderOrder - b.renderOrder);
  const [config, setConfig] = useState<SearchParams>({});

  function handleChange(key: string, value: string) {
    setConfig(prev => ({ ...prev, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params: SearchParams = {};

    fields.forEach(f => {
      if (config[f.key]) {
        params[f.queryParam ?? f.key] = config[f.key];
      }
    });

    onSearch(params);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {sorted.map(field => (
          <div key={field.key}>
            <Label>{field.label}</Label>

            {field.uiType === "input" && (
              <Input
                type="text"
                placeholder={field.placeholder}
                value={config[field.key] ?? ""}
                onChange={e => handleChange(field.key, e.target.value)}
                className="mt-1 h-[35px]"
              />
            )}

            {field.uiType === "date" && (
              <Input
                type="date"
                value={config[field.key] ?? ""}
                onChange={e => handleChange(field.key, e.target.value)}
                className="mt-1"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button type="submit">Search</Button>
        <Button type="button" onClick={() => { setConfig({}); onSearch({}); }}>
          Reset
        </Button>
      </div>
    </form>
  );
};
