export type TypePoisons = {
    __v: string
    _id: string
    cost: number
    sum: number
    date: string
    owner: string
    name: string
    weight: number
}

export type TypeCorn = {
    __v: number
    _id: string
    cost: number
    owner: string
    name: string
    weight: number
    color: string[]
}

export type TypeSale = {
    __v: number
    _id: string
    sum: number
    date: Date
    name: string
    owner: string
    weight: number
}