import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
import { axiosError, axiosHeaders } from '../helpers/util'
import config from '../config/config.json'

const numToDate = (num) => moment(num).format('YYYY-MM-DD')

class TaskService {
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
   * @param {string} from
   * @param {string} to
   * @returns {Promise<{ _id: string, uid: string, taskName: string, date: number, duration: number }[]>}
   */
  async listTasks (from, to) {
    try {
      const query = new URLSearchParams()
      if (from) query.set('from', new Date(from).valueOf())
      if (to) query.set('to', new Date(to).valueOf())

      const res = await this.httpClient.get(`/tasks?${query.toString()}`)
      return res.data.map(d => {
        const data = _.pick(d, ['_id', 'uid', 'taskName', 'date', 'duration'])
        data.date = numToDate(data.date)
        return data
      })
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
   * @param {string} from
   * @param {string} to
   */
  async exportTasks (from, to) {
    try {
      const query = new URLSearchParams()
      if (from) query.set('from', new Date(from).valueOf())
      if (to) query.set('to', new Date(to).valueOf())

      const { data } = await this.httpClient.get(`/tasks/export?${query.toString()}`)
      const downloadUrl = window.URL.createObjectURL(new window.Blob([data]))
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', 'export.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
   * @param {string} taskName
   * @param {number} date
   * @param {number} duration
   * @returns {Promise<{ _id: string, uid: string, taskName: string, date: number, duration: number }>}
   */
  async createTask (taskName, date, duration) {
    try {
      const res = await this.httpClient.post('/tasks', { taskName, date: new Date(date).valueOf(), duration: +duration })
      const data = _.pick(res.data, ['_id', 'uid', 'taskName', 'date', 'duration'])
      data.date = numToDate(data.date)
      return data
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
   * @param {string} id
   * @param {string} taskName
   * @param {number} date
   * @param {number} duration
   * @returns {Promise<{ _id: string, uid: string, taskName: string, date: number, duration: number }>}
   */
  async updateTask (id, taskName, date, duration) {
    try {
      const res = await this.httpClient.patch(`/tasks/${id}`, { taskName, date: new Date(date).valueOf(), duration: +duration })
      const data = _.pick(res.data, ['_id', 'uid', 'taskName', 'date', 'duration'])
      data.date = numToDate(data.date)
      return data
    } catch (err) {
      throw axiosError(err)
    }
  }

  /**
   * @param {string} id
   */
  async deleteTask (id) {
    try {
      await this.httpClient.delete(`/tasks/${id}`)
    } catch (err) {
      throw axiosError(err)
    }
  }
}

export default TaskService
