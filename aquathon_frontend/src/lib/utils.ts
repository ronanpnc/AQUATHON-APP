import { type ClassValue, clsx } from 'clsx';
import _ from 'lodash';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function upsert<T>(arr:T[], key:string, newval:T) {
    const match = _.find(arr, key);
    if(match){
        const index = _.indexOf(arr, _.find(arr, key));
        arr.splice(index, 1, newval);
    } else {
        arr.push(newval);
    }
};
