import { instance } from '../../instance'
import { handleApiError } from '../../helpers'

export default {
  async getAll<TRes>(): Promise<TRes> {
    try {
      const response = await instance.get<TRes>('/product')
      return response.data
    } catch (err) {
      handleApiError(err, 'getAll')
    }
  },
  async getById<TRes>(id: string | number): Promise<TRes> {
    try {
      const response = await instance.get<TRes>(`/product/${id}`)
      return response.data
    } catch (err) {
      handleApiError(err, 'getById')
    }
  },
  async search<TRes>(keyword: string): Promise<TRes> {
    try {
      const response = await instance.get<TRes>('/product', { params: { keyword } })
      return response.data
    } catch (err) {
      handleApiError(err, 'search')
    }
  },
  async create<TBody, TRes>(body: TBody): Promise<TRes> {
    try {
      const response = await instance.post<TRes>('/product', body)
      return response.data
    } catch (err) {
      handleApiError(err, 'create')
    }
  },
  async uploadImage<TRes>(formData: FormData): Promise<TRes> {
    try {
      const response = await instance.post<TRes>('/product/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response.data
    } catch (err) {
      handleApiError(err, 'uploadImage')
    }
  },
  async update<TBody, TRes>(id: string | number, body: TBody): Promise<TRes> {
    try {
      const response = await instance.put<TRes>(`/product/${id}`, body)
      return response.data
    } catch (err) {
      handleApiError(err, 'update')
    }
  },
  async delete<TRes>(id: string | number): Promise<TRes> {
    try {
      const response = await instance.delete<TRes>(`/product/${id}`)
      return response.data
    } catch (err) {
      handleApiError(err, 'delete')
    }
  },
  async deleteByBody<TBody, TRes> (body: TBody): Promise<TRes | undefined> {
    try {
      const response = await instance.delete<TRes>('/product', {
        data: body
      })
      return response.data
    } catch (err) {
      handleApiError(err, 'delete')
    }
  },
}
