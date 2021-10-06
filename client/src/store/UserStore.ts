import {makeAutoObservable} from 'mobx'

class CornStore {

    token:string | null = null
    userId: string | null = null
    ready: boolean = false

    constructor() {
        makeAutoObservable(this)
    }
}



export default CornStore
