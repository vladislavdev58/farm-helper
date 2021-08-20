import React, {FC, useEffect, useRef} from 'react'

type MyProps = {
    format?: string,
    formik: any,
    label?: string
}

export const DatePicker:FC<MyProps> = ({format = 'yyyy-mm-dd', formik, label = 'Дата'}) => {
    const options = {
        autoClose: true,
        format: format,
        onSelect: (value:string) => formik.setFieldValue('date', value, true)
    }
    // FIXME заменить any
    const dateRef = useRef<any>()
    useEffect(() => {
        (window as any).M.Datepicker.init(dateRef.current, options)
        // eslint-disable-next-line
    }, [dateRef.current])
    return (
        <>
            <input type="text" ref={dateRef} className="datepicker" name='date'/>
            <label htmlFor="password">Дата</label>
        </>
    )
}
