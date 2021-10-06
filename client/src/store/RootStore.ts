import UserStore from './UserStore'
import CornStore from './CornStore'

class RootStore {
    userStore: UserStore
    cornStore: CornStore

    constructor() {
        this.userStore = new UserStore()
        this.cornStore = new CornStore()
    }
}

export default RootStore
