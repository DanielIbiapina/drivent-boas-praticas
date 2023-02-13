import { ApplicationError } from '@/protocols';

export function roomIsFullError(): ApplicationError {
  return {
    name: 'roomIsFullError',
    message: 'Room is full, look for another room!',
  };
}
