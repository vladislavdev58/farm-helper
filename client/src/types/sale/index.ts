export type TypeSaleData = {
    __v: number
    _id: string
    sum: number
    date: Date
    name: string
    owner: string
    weight: number
}

export type TypeSaleForm = {
    _id: string | undefined
    weight: string
    date: Date | null
}