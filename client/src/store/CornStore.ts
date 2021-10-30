import {makeAutoObservable} from 'mobx'
import {TypeCornData} from '../types/corn'
import {TypePoisonsData} from '../types/poisons'
import {TypeSaleData} from '../types/sale'

class CornStore {

    allCorn:TypeCornData[] | [] = []
    allPoisons: TypePoisonsData[] | [] = []
    allSale: TypeSaleData[] | [] = []


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



export default CornStore
