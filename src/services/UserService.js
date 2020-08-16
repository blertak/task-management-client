import _ from 'lodash'
import axios from 'axios'
import { axiosError, axiosHeaders } from '../helpers/util'
import config from '../config/config.json'

class UserService {
  /**
   * @param {string} authToken
   * @param {'jwt'|'oauth2.0'} tokenType
   */
  setToken (authToken, tokenType) {
    const headers = axiosHeaders(authToken, tokenType)

    this.httpClient = axios.create({
      baseURL: config.apiUrl,
      headers
    })
  }

  /**
   * @returns {Promise<{ _id: string, email: string, role: string, googleId?: string, githubId?: string }[]>}
   */
  async listUsers () {
    try {
      const res = await this.httpClient.get('/admin/users')
      return res.data.map(d => _.pick(d, ['_id', 'email', 'role', 'googleId', 'githubId']))
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
   * @param {string} email
   * @param {string} password
   * @param {string} role
   * @returns {Promise<{ _id: string, email: string, role: string, googleId?: string, githubId?: string }>}
   */
  async createUser (email, password, role) {
    try {
      const res = await this.httpClient.post('/admin/users', { email, password, role })
      return _.pick(res.data, ['_id', 'email', 'role', 'googleId', 'githubId'])
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
   * @param {string} id
   * @param {string} email
   * @param {string} role
   * @returns {Promise<{ _id: string, email: string, role: string, googleId?: string, githubId?: string }>}
   */
  async updateUser (id, email, role) {
    try {
      const res = await this.httpClient.patch(`/admin/users/${id}`, { email, role })
      return _.pick(res.data, ['_id', 'email', 'role', 'googleId', 'githubId'])
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
   * @param {string} id
   */
  async deleteUser (id) {
    try {
      await this.httpClient.delete(`/admin/users/${id}`)
    } catch (err) {
      throw axiosError(err)
    }
  }
}

export default UserService
