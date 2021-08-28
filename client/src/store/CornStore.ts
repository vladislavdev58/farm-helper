import {makeAutoObservable} from 'mobx'
import {TypeCorn, TypePoisons, TypeSale} from '../types/types'

class CornStore {

    allCorn:TypeCorn[] | [] = []
    allPoisons: TypePoisons[] | [] = []
    allSale: TypeSale[] | [] = []


    constructor() {
        makeAutoObservable(this)
    }

    getAllName = () => {
        const result: Array<string> = this.allCorn.map(item => {
            return item.name
        })
        return result
    }

    getAllWeight = () => {
        const result: Array<number> = this.allCorn.map(item => {
            return item.weight
        })
        return result
    }

    getAllColor = (index: number) => {
        const result: Array<string> = this.allCorn.map(item => {
            return item.color[index]
        })
        return result
    }
}



export default new CornStore()
