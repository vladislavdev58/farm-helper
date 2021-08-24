import React, {useContext, useEffect, useRef} from 'react'
import {useMessage} from '../hooks/message.hook'
import {useFormik} from 'formik'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {runInAction} from 'mobx'
import CornStore from '../store/CornStore'
import {Loader} from './Loader/Loader'
import {DatePicker} from './DatePicker'
import {observer} from 'mobx-react'


type TypeForm = {
    name: string
    weight: number
    date: Date | null
}

export const AddSale = observer(() => {
    const message = useMessage()
    const saleFormik = useFormik<TypeForm>({
        initialValues: {
            name: '',
            weight: 0,
            date: null
        },
        onSubmit: async (values) => {
            console.log(values)
            addHandler(values)

        }
    })
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const addHandler = async (values: TypeForm) => {
        try {
            const data = await request('/api/sale/add', 'POST', {...values}, {
                Authorization: `Bearer: ${auth.token}`
            })
            const {corn} = data
            runInAction(() => {
                CornStore.allCorn = [...CornStore.allCorn, ...[corn]]
            })
            message('Добавлено')
        } catch (e) {

        }
    }
    const select = CornStore.allCorn.map(item =>
        <option value={item.name} >{item.name}</option>
    )
    const selectRef = useRef<any>()
    useEffect(() => {
        (window as any).M.FormSelect.init(selectRef.current)
        // eslint-disable-next-line
    }, [selectRef.current])
    if (loading) {
        return <Loader/>
    }
    return (
        <form onSubmit={saleFormik.handleSubmit}>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <select ref={selectRef}>
                                <option value="" disabled selected>Выберите зерно</option>
                                {select}
                            </select>

                        </div>
                    </div>

                    <div className="row s12">
                        <div className="input-field col s6">
                            <input className='validate' onChange={saleFormik.handleChange} name='weight'
                                   type="number"/>
                            <label htmlFor="password">Объем</label>
                        </div>

                        <div className="input-field col s6">
                            <DatePicker
                                formik={saleFormik}
                            />
                        </div>
                    </div>
                </div>
                <button type='submit' className="btn waves-effect waves-light">Добавить
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </form>
    )
})
