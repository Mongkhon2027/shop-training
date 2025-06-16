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

  // เพิ่มฟังก์ชันสำหรับ add/update cart
  async addOrUpdateCart<TBody, TRes>(body: TBody): Promise<TRes> {
    try {
      const response = await instance.post<TRes>('/carts', body)
      return response.data
    } catch (err) {
      handleApiError(err, 'addOrUpdateCart')
    }
  },
  
  async updateCart<TBody, TRes>(id: string | number, body: TBody): Promise<TRes> {
    try {
      const response = await instance.put<TRes>(`/carts/${id}`, body)
      return response.data
    } catch (err) {
      handleApiError(err, 'updateCart')
    }
  }
}
