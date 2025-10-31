import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ConfigForm = ({ fields, onSearch }) => {

  const sorted = [...fields].sort((a, b) => a.renderOrder - b.renderOrder);
  const [config, setConfig] = useState({});

  function handleChange(k, v) { setConfig(p => ({ ...p, [k]: v })); }

  function submit(e) {
    e.preventDefault();
    const params = {};
    fields.forEach(field => { if (config[field.key]) params[field.queryParam ?? field.key] = config[field.key]; });
    console.log(params)
    onSearch(params);
  }

  return (<form onSubmit={submit} className='space-y-4'>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
      {sorted.map(field => (
        <div key={field.key}><Label>{field.label}</Label>
          {field.uiType === 'input' && <Input type='text' placeholder={field.placeholder} value={config[field.key] ||''} onChange={e=>handleChange(field.key,e.target.value)} className='mt-1 h-[35px] focus:outline-none block w-full rounded-md border-gray-300 shadow-sm'/>}
          {field.uiType === 'date' && <Input type='date' value={config[field.key] ||''} onChange={e=>handleChange(field.key,e.target.value)} className='mt-1 focus:outline-none block w-full rounded-md border-gray-300 shadow-sm'/>}
        </div>
      ))}
    </div>
    <div className='flex gap-2'>
      <Button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-md'>Search</Button>
      <Button type='button' className='px-4 py-2 bg-gray-200 rounded-md' onClick={()=>{setConfig({});onSearch({});}}>Reset</Button>
    </div>
  </form>);
};