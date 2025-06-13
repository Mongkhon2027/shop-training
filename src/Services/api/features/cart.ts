import { instance } from '../../instance'
import { handleApiError } from '../../helpers'

export default {
  async getAll<TRes>(): Promise<TRes> {
    try {
      const response = await instance.get<TRes>('/carts')
      return response.data
    } catch (err) {
      handleApiError(err, 'getAll')
    }
  },
  async getById<TRes>(id: string | number): Promise<TRes> {
    try {
      const response = await instance.get<TRes>(`/carts/${id}`)
      return response.data
    } catch (err) {
      handleApiError(err, 'getById')
    }
  },
  async getByUserId<TRes>(userId: string | number): Promise<TRes>{
    try {
      const response = await instance.get<TRes>(`/carts/user/${userId}`)
      return response.data
    } catch (error) {
      handleApiError(error, 'getByUserId')
    }
  },
}
