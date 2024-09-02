'use client';

import { X } from 'lucide-react';
import React, { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  const renderInputField = (label: string, name: string, type = 'text', placeholder: string) => (
    <div>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className='mt-1 mb-5 h-10 block w-full border border-gray-300 rounded-xl p-4 shadow-sm outline-none'
      />
    </div>
  );

  return (
    <div>
      <nav className='flex items-center justify-between border-b p-4 border-gray-300 shadow-md shadow-[#F3F4F6] mb-4'>
        <div className='flex items-center'>
          <BackButton />
          <h1 className='text-xl font-bold ml-4'>Create New Participant</h1>
        </div>
      </nav>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-md mx-auto p-4'>
        {renderInputField('First Name', 'firstName', '', 'Koem')}
        {renderInputField('Last Name', 'lastName', '', 'Socheata')}
        {renderInputField('Bib', 'bib', '', '120')}
        <div>
        <label className='block text-sm font-medium text-gray-700'>Gender</label>
          <Select>
            <SelectTrigger className='mt-1 mb-5 h-10 w-full border border-gray-300 rounded-xl p-4'>
              <SelectValue placeholder='Choose Your Gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value='male'>Male</SelectItem>
                <SelectItem value='female'>Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {renderInputField('Date of Birth', 'dateOfBirth', 'date', '')}
        {renderInputField('Age', 'age', 'number', '21')}
        {renderInputField('School', 'school', '', 'Phnom Penh')}
        <button
          type='submit'
          className='w-full bg-[#F3F4F6] text-gray-500 font-bold py-2 px-4 rounded-xl shadow-sm hover:bg-gray-200'
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
