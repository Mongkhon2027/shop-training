import { instance } from "@/Services/instance";
import { handleApiError } from "@/Services/helpers";

export default {
  async login<TBody, TRes>(body: TBody): Promise<TRes> {
    try {
      const response = await instance.post<TRes>('auth/login', body)
      return response.data
    } catch (err) {
      handleApiError(err, 'login')
    }
  }
}
