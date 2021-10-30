import {makeAutoObservable, toJS} from 'mobx'
import {TypeCornData} from '../types/corn'
import {TypePoisonsData} from '../types/poisons'
import {TypeSaleData} from '../types/sale'
import {MobXGlobals} from 'mobx/dist/core/globalstate'

class CornStore {

    allCorn: TypeCornData[] | [] = []
    allPoisons: TypePoisonsData[] | [] = []
    allSale: TypeSaleData[] | [] = []


    constructor() {
        makeAutoObservable(this)
    }

    // Нужно получить массив продаж конктреной корн
    //

    getInfoSalesBar = () => {
        const datasets = this.allCorn.map(((corn) => {
            const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            const sales: TypeSaleData[] = this.allSale.filter((sale) => sale.name === corn.name)
            sales.map((sale) => {
                const month = new Date(sale.date).getMonth()
                data[month] += sale.weight
            })
            return {
                label: corn.name,
                data,
                backgroundColor: corn.color
            }
        }))
        console.log(datasets)
        return {
            labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            datasets
        }
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
