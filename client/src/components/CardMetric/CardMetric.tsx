import React, {FC} from 'react'

type TypeMyProps = {
    text: string | null
    col: number
    children: React.ReactNode
}
export const CardMetric:FC<TypeMyProps> = ({text, col, children}) => {
    console.log(text)
    return (
        <div className={`col s${col}`}>
            <div className="card">
                <div className="card-image">
                    {children}
                </div>
                <div className="card-content">
                    {text && <p>{text}</p>}
                </div>
            </div>
        </div>
    )
}
