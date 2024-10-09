'use client';

import { QueryOptions, UndefinedInitialDataOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { string } from 'zod';

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const useFetch = <T>(queryKey: string | string[], url: string, config?:Partial<UseQueryOptions<T>>) => {
  return useQuery<T, Error>({
    ...config,
    queryKey:  typeof queryKey === "string" ? [queryKey]: queryKey,
    queryFn: () => fetchData<T>(url),
  });

};
