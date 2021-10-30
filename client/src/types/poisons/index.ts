export type TypePoisonsData = {
    __v: string
    _id: string
    cost: number
    sum: number
    date: string
    owner: string
    name: string
    weight: number
}

export type TypePoisonsForm = {
    name: string
    weight: string
    cost: string
    date: Date | null
}