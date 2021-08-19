import React, {FC, useContext} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {useFormik} from 'formik'
import {Loader} from '../Loader/Loader'
import {useMessage} from '../../hooks/message.hook'
import CornStore from '../../store/CornStore'
import {TypePoisons} from '../../types/types'

type TypeForm = {
    title: string
    weight: number
    cost: number
    date: Date | null
}

type MyProps = {
    fetchPoisons: () => void
}

export const AddPoisons:FC<MyProps> = ({fetchPoisons}) => {
    const message = useMessage()
    const poisonsFormik = useFormik<TypeForm>({
        initialValues: {
            title: '',
            weight: 0,
            cost: 0,
            date: null
        },
        onSubmit: async (values) => {
            console.log(values)
            await addHandler(values)
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
            // FIXME Убрать игнор
            // @ts-ignore
            CornStore.allPoisons.push(poison)
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
                            <input className='validate' onChange={poisonsFormik.handleChange} name='title' type="text"/>
                            <label htmlFor="password">Название яда</label>
                        </div>
                    </div>

                    <div className="row s12">
                        <div className="input-field col s4">
                            <input className='validate' onChange={poisonsFormik.handleChange} name='weight'
                                   type="number"/>
                            <label htmlFor="password">Объем</label>
                        </div>

                        <div className="input-field col s4">
                            <input className='validate' onChange={poisonsFormik.handleChange} name='cost' type="number"/>
                            <label htmlFor="password">Стоимость</label>
                        </div>

                        <div className="input-field col s4">
                            <input className='validate' onChange={poisonsFormik.handleChange} name='date' type='date'/>
                            <label htmlFor="password">Дата</label>
                        </div>
                    </div>
                </div>
                <button type='submit' className="btn waves-effect waves-light">Отправить
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </form>
    )
}
