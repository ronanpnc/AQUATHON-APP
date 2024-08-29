'use client';

import { ChevronLeft, X } from 'lucide-react';
import { useState } from 'react';

import '@/styles/globals.css';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

const CreateParticipant = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    bib: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    school: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
  };

  const renderInputField = (label: string, name: string, type = 'text') => (
    <div className=''>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        type={type}
        name={name}
        // value={formValues[name]}
        onChange={handleChange}
        className='mt-1 mb-5 h-10 block w-full border border-gray-300 rounded-md p-2 shadow-sm outline-none'
      />
    </div>
  );

  return (
    <div>
      <nav className='flex items-center justify-between border-b p-4 border-gray-300 shadow-md shadow-[#F3F4F6] mb-4'>
      <div className='flex items-center'>
        <BackButton />
        <h1 className='text-xl font-bold ml-4'>Create Participant</h1>
      </div>
      </nav>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-md mx-auto p-4'>
        {renderInputField('First Name', 'firstName')}
        {renderInputField('Last Name', 'lastName')}
        {renderInputField('Bib', 'bib')}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Gender</label>
          <Select>
            <SelectTrigger className='mt-1 mb-5 border border-gray-300 rounded-md'>
              <SelectValue placeholder='Choose Gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='Male'>Male</SelectItem>
                <SelectItem value='Female'>Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {renderInputField('Date of Birth', 'dateOfBirth', 'date')}
        {renderInputField('Age', 'age', 'number')}
        {renderInputField('School', 'school')}
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600'
        >
          Add
        </button>
      </form>
    </div>
  );
};

function BackButton() {
  return (
    <button className='text-2xl'>
      <a href='/races'>
        <X />
      </a>
    </button>
  );
}

export default CreateParticipant;
