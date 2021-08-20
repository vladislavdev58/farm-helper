import {makeAutoObservable} from 'mobx'
import {TypeCorn, TypePoisons} from '../types/types'

class CornStore {

    allCorn:TypeCorn[] | [] = []
    allPoisons: TypePoisons[] | [] = []


    constructor() {
        makeAutoObservable(this)
    }

    getAllName = () => {
        const result: Array<string> = this.allCorn.map(item => {
            return item.name
        })
        return result
        console.log(result)
    }

    getAllWeight = () => {
        const result: Array<number> = this.allCorn.map(item => {
            return item.weight
        })
        return result
        console.log(result)
    }

    getAllColor = (index: number) => {
        const result: Array<string> = this.allCorn.map(item => {
            return item.color[index]
        })
        return result
        console.log(result)
    }
}



export default new CornStore()
