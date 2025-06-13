import { instance } from '../../instance'
import { handleApiError } from '../../helpers'

export default {
  async getAll<TRes>(): Promise<TRes> {
    try {
      const response = await instance.get<TRes>('/products')
      return response.data
    } catch (err) {
      handleApiError(err, 'getAll')
    }
  },
  async getById<TRes>(id: string | number): Promise<TRes> {
    try {
      const response = await instance.get<TRes>(`/products/${id}`)
      return response.data
    } catch (err) {
      handleApiError(err, 'getById')
    }
  },
  async search<TRes>(keyword: string): Promise<TRes> {
    try {
      const response = await instance.get<TRes>('/products', { params: { keyword } })
      return response.data
    } catch (err) {
      handleApiError(err, 'search')
    }
  },
  async create<TBody, TRes>(body: TBody): Promise<TRes> {
    try {
      const response = await instance.post<TRes>('/products', body)
      return response.data
    } catch (err) {
      handleApiError(err, 'create')
    }
  },
  async uploadImage<TRes>(formData: FormData): Promise<TRes> {
    try {
      const response = await instance.post<TRes>('/products/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response.data
    } catch (err) {
      handleApiError(err, 'uploadImage')
    }
  },
  async update<TBody, TRes>(id: string | number, body: TBody): Promise<TRes> {
    try {
      const response = await instance.put<TRes>(`/products/${id}`, body)
      return response.data
    } catch (err) {
      handleApiError(err, 'update')
    }
  },
  async delete<TRes>(id: string | number): Promise<TRes> {
    try {
      const response = await instance.delete<TRes>(`/products/${id}`)
      return response.data
    } catch (err) {
      handleApiError(err, 'delete')
    }
  },
  async deleteByBody<TBody, TRes> (body: TBody): Promise<TRes | undefined> {
    try {
      const response = await instance.delete<TRes>('/products', {
        data: body
      })
      return response.data
    } catch (err) {
      handleApiError(err, 'delete')
    }
  },
}
