'use client';

import { Asterisk, X } from 'lucide-react';
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

const savedColors = ['#EC4899', '#F43F5E', '#84CC16', '#D946EF', '#8B5CF6', '#0EA5E9'];

type FormValues = {
  firstName: string;
  lastName: string;
  bib: string;
  gender: string;
  dateOfBirth: string;
  school: string;
  color: string;
};

type Errors = Record<keyof FormValues, boolean>;

const CreateParticipant = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    bib: '',
    gender: '',
    dateOfBirth: '',
    school: '',
    color: '',
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: false,
    lastName: false,
    bib: false,
    gender: false,
    dateOfBirth: false,
    school: false,
    color: false,
  });

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: value.trim() === '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, gender: value }));
    setErrors((prevErrors) => ({ ...prevErrors, gender: false }));
  };

  const handleColorChange = (color: string) => {
    setFormValues((prevValues) => ({ ...prevValues, color }));
    setSelectedColor(color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = Object.keys(formValues).reduce((acc, key) => {
      acc[key as keyof FormValues] = key !== 'color' && formValues[key as keyof FormValues].trim() === '';
      return acc;
    }, {} as Errors);

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Handle form submission
  };

  const renderInputField = (label: string, name: keyof FormValues, type = 'text', placeholder: string) => (
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        <Asterisk className='inline-block text-red-500 size-4' /> {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formValues[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`mt-1 mb-1 h-10 block w-full border ${
          errors[name] && name !== 'color' ? 'border-red-500' : 'border-gray-300'
        } rounded-xl p-4 shadow-sm outline-none`}
      />
      {errors[name] && name !== 'color' && <p className='text-red-500 text-sm'>This field is required.</p>}
    </div>
  );

  return (
    <div className='bg-[#F3F6FB] h-screen'>
      <nav className='flex items-center justify-between sticky top-0 bg-[#7E83DE] text-white border-b p-4 border-gray-300 shadow-md mb-4'>
        <div className='flex items-center'>
          <BackButton />
          <h1 className='text-xl font-bold ml-4'>Create New Participant</h1>
        </div>
      </nav>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-md mx-auto p-4'>
        {renderInputField('First Name', 'firstName', 'text', 'Koem')}
        {renderInputField('Last Name', 'lastName', 'text', 'Socheata')}
        {renderInputField('Bib', 'bib', 'text', '120')}

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            <Asterisk className='inline-block text-red-500 size-4' /> Gender
          </label>
          <Select onValueChange={handleGenderChange}>
            <SelectTrigger
              className={`mt-1 mb-1 h-10 w-full border ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              } rounded-xl p-4`}
            >
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
          {errors.gender && <p className='text-red-500 text-sm'>This field is required.</p>}
        </div>

        {renderInputField('Date of Birth', 'dateOfBirth', 'date', '')}
        {renderInputField('School', 'school', 'text', 'CADT')}

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Color (Optional)</label>
          <div className='mt-2 w-full bg-white p-4 rounded-lg'>
            <div className='grid grid-cols-6 gap-2'>
              {savedColors.map((savedColor) => (
                <button
                  key={savedColor}
                  type='button'
                  className={`w-8 h-8 rounded-full border-2 ${
                    savedColor === selectedColor ? 'border-gray-500' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: savedColor }}
                  onClick={() => handleColorChange(savedColor)}
                />
              ))}
            </div>
          </div>
        </div>

        <button type='submit' className='w-full bg-[#7E83DE] text-white font-bold p-5 rounded-3xl shadow-sm'>
          Create
        </button>
      </form>
    </div>
  );
};

const BackButton = () => (
  <button className='text-2xl'>
    <a href='/races'>
      <X />
    </a>
  </button>
);

export default CreateParticipant;
