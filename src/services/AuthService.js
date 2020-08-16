import axios from 'axios'
import { axiosError } from '../helpers/util'
import config from '../config/config.json'

class AuthService {
  constructor () {
    this.httpClient = axios.create({
      baseURL: config.apiUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ token: string, expire: number, userId: string }>}
   */
  async login (email, password) {
    try {
      const res = await this.httpClient.post('/auth/login', { email, password })
      return res.data
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
    * @param {string} email
    * @param {string} password
    * @returns {Promise<{ token: string, expire: number, userId: string }>}
    */
  async register (email, password) {
    try {
      const res = await this.httpClient.post('/auth/register', { email, password })
      return res.data
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
   * @param {strinf} password
   */
  async resetPassword (authToken, password) {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }

      await this.httpClient.patch('/auth/update/password', { password }, { headers })
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
   * @param {string} authToken
   * @param {'jwt'|'oauth2.0'} tokenType
   * @returns {Promise<{ _id: string, email: string, role: string }>}
   */
  async getUserInfo (authToken, tokenType) {
    try {
      const headers = {}
      if (tokenType === 'jwt') headers.Authorization = `Bearer ${authToken}`
      if (tokenType === 'oauth2.0') headers['X-OAUTH-TOKEN'] = authToken

      const res = await this.httpClient.get('/auth/info', { headers })
      return res.data
    } catch (err) {
      throw axiosError(err)
    }
  }
}

export default AuthService
