import React, {useContext} from 'react'
import {useFormik} from 'formik'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {Loader} from './Loader/Loader'
import {useMessage} from '../hooks/message.hook'
import CornStore from '../store/CornStore'
import {runInAction} from 'mobx'

type TypeForm = {
    name: string
    weight: number
    cost: number
}

export const AddCorn = () => {
    const message = useMessage()
    const cornFormik = useFormik<TypeForm>({
        initialValues: {
            name: '',
            weight: 0,
            cost: 0
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
            const data = await request('/api/corn/addCorn', 'POST', {...values}, {
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
    if (loading) {
        return <Loader/>
    }
    return(
        <form onSubmit={cornFormik.handleSubmit}>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input className='validate' onChange={cornFormik.handleChange} name='name' type="text"/>
                            <label htmlFor="password">Название зерна</label>
                        </div>
                    </div>

                    <div className="row s12">
                        <div className="input-field col s6">
                            <input className='validate' onChange={cornFormik.handleChange} name='weight'
                                   type="number"/>
                            <label htmlFor="password">Объем</label>
                        </div>

                        <div className="input-field col s6">
                            <input className='validate' onChange={cornFormik.handleChange} name='cost' type="number"/>
                            <label htmlFor="password">Стоимость</label>
                        </div>
                    </div>
                </div>
                <button type='submit' className="btn waves-effect waves-light">Добавить
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </form>
    )
}
