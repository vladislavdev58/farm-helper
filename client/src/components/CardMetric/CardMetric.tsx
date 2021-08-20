import React, {FC} from 'react'

type TypeMyProps = {
    text: string | null
    col: number
}
export const CardMetric:FC<TypeMyProps> = ({text, col, children}) => {
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
