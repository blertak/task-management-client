// Actions
import * as app from '../containers/App/store/actions'
import * as users from '../containers/Users/store/actions'
import * as tasks from '../containers/Task/store/actions'

// Export all reducers at once
const actions = {
  app,
  users,
  tasks
}

export default actions
