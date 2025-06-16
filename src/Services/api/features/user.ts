
import { instance } from '../../instance'
import { handleApiError } from '../../helpers'

export default {
  async getById<TRes>(id: string | number): Promise<TRes> {
    try {
      const response = await instance.get<TRes>(`/users/${id}`)
      return response.data
    } catch (err) {
      handleApiError(err, 'getById')
    }
  },
  async getAll<TRes>(): Promise<TRes> {
    try {
      const response = await instance.get<TRes>('/users')
      return response.data
    } catch (err) {
      handleApiError(err, 'getAll')
    }
  }
}