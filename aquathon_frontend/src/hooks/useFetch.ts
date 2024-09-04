'use client';

import { useQuery } from '@tanstack/react-query';

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const useFetch = <T>(queryKey: string, url: string) => {
  return useQuery<T, Error>({
    queryKey: [queryKey],
    queryFn: () => fetchData<T>(url),
  });
};
