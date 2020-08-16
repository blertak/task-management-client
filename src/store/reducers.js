// Reducers
import app from '../containers/App/store/reducer'
import users from '../containers/Users/store/reducer'
import tasks from '../containers/Task/store/reducer'

// Export all reducers at once
const reducers = {
  app,
  users,
  tasks
}

export default reducers
