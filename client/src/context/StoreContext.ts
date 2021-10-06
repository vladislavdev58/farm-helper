import React from 'react'
import UserStore from '../store/UserStore'
import CornStore from '../store/CornStore'
import RootStore from '../store/RootStore'

interface StoreContextInterface  {
    rootStore: RootStore,
    userStore: UserStore,
    cornStore: CornStore
}

const StoreContext = React.createContext<StoreContextInterface | null>(null)

export default StoreContext
