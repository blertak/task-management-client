// Actions
import * as app from '../containers/App/store/actions'
import * as users from '../containers/Users/store/actions'

// Export all reducers at once
const actions = {
  app,
  users
}

export default actions
