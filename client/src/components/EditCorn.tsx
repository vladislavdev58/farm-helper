import React, {FC, useContext} from 'react'
import {useMessage} from '../hooks/message.hook'
import {useFormik} from 'formik'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {runInAction} from 'mobx'
import CornStore from '../store/CornStore'
import {Loader} from './Loader/Loader'

type MyProps = {
    _id: string
    name: string
    weight: number
    cost: number
}

type TypeForm = {
    name: string
    weight: number
    cost: number
    _id?: string
}

export const EditCorn: FC<MyProps> = ({_id, name, weight, cost}) => {
    const message = useMessage()
    const cornFormik = useFormik<TypeForm>({
        initialValues: {
            name,
            weight,
            cost
        },
        onSubmit: async (values) => {
            await editHandler(values)

        }
    })
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const editHandler = async (values: TypeForm) => {
        try {
            values._id = _id
            const data = await request('/api/corn/edit', 'POST', {...values}, {
                Authorization: `Bearer: ${auth.token}`
            })
            const {corn} = data
            // runInAction(() => {
            //     CornStore.allCorn = [...CornStore.allCorn, ...[corn]]
            // })
            message(data.message)
        } catch (e) {

        }
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <form onSubmit={cornFormik.handleSubmit}>
                <div className="row">
                    <div className="col s4">
                        <input className='validate' onChange={cornFormik.handleChange} defaultValue={cornFormik.values.name} name='name' type="text"/>
                        <label htmlFor="password">Название зерна</label>
                    </div>
                    <div className="col s4">
                        <input className='validate' onChange={cornFormik.handleChange} defaultValue={cornFormik.values.name} name='weight'
                               type="number"/>
                        <label htmlFor="password">Объем</label>
                    </div>
                    <div className="col s4">
                        <input className='validate' onChange={cornFormik.handleChange} defaultValue={cornFormik.values.name} name='cost' type="number"/>
                        <label htmlFor="password">Стоимость</label>
                    </div>
                </div>
                <button type='submit' className="btn waves-effect waves-light">Отправить
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}
