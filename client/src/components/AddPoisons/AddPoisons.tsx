import React, {FC, useContext} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {useFormik} from 'formik'
import {Loader} from '../Loader/Loader'
import {useMessage} from '../../hooks/message.hook'
import CornStore from '../../store/CornStore'
import {DatePicker} from '../DatePicker'
import {runInAction} from 'mobx'

type TypeForm = {
    name: string
    weight: number
    cost: number
    date: Date | null
}

type MyProps = {
    fetchPoisons: () => void
}

export const AddPoisons: FC<MyProps> = ({fetchPoisons}) => {
    const message = useMessage()
    const poisonsFormik = useFormik<TypeForm>({
        initialValues: {
            name: '',
            weight: 0,
            cost: 0,
            date: null
        },
        onSubmit: async (values) => {
            await addHandler(values)
            poisonsFormik.resetForm()
        }
    })
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const addHandler = async (values: TypeForm) => {
        try {
            const data = await request('/api/poisons/add', 'POST', {...values}, {
                Authorization: `Bearer: ${auth.token}`
            })
            const {poison} = data
            runInAction(() => {
                CornStore.allPoisons = [...CornStore.allPoisons, ...[poison]]
            })
            message('Добавлено')
        } catch (e) {

        }
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <form onSubmit={poisonsFormik.handleSubmit}>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input className='validate' onChange={poisonsFormik.handleChange} name='name' type="text"/>
                            <label htmlFor="password">Название яда</label>
                        </div>
                    </div>

                    <div className="row s12">
                        <div className="input-field col s4">
                            <input className='validate' onChange={poisonsFormik.handleChange} name='weight'
                                   type="number"/>
                            <label htmlFor="password">Объем(кг)</label>
                        </div>

                        <div className="input-field col s4">
                            <input className='validate' onChange={poisonsFormik.handleChange} name='cost'
                                   type="number"/>
                            <label htmlFor="password">Цена(руб)</label>
                        </div>

                        <div className="input-field col s4">
                            <DatePicker
                                formik={poisonsFormik}
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
}
