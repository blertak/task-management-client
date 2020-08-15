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
   * @returns {Promise<{ _id: string, email: string, role: string }[]>}
   */
  async listUsers () {
    try {
      const res = await this.httpClient.get('/admin/users')
      return res.data.map(d => _.pick(d, ['_id', 'email', 'role']))
    } catch (err) {
      throw axiosError(err)
    }
  }
}

export default UserService
