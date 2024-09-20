'use client';

import { useQuery } from '@tanstack/react-query';
import { string } from 'zod';

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const useFetch = <T>(queryKey: string | string[], url: string) => {
  return useQuery<T, Error>({
    queryKey:  typeof queryKey === "string" ? [queryKey]: queryKey,
    queryFn: () => fetchData<T>(url),
  });

};
