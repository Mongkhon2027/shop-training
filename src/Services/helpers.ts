import { AxiosError } from 'axios'

export function handleApiError(err: unknown, method: string): never {
  const error = err as AxiosError
  console.error(`Error from API ${method}:`, error.message, error.response?.data)
  throw error
}
