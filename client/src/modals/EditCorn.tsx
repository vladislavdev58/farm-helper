import React, {FC, useContext} from 'react'
import {Modals} from '../layouts/Modals'
import {useMessage} from '../hooks/message.hook'
import {useFormik} from 'formik'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {runInAction} from 'mobx'
import StoreContext from '../context/StoreContext'

type MyProps = {
    _id: string
    name: string
    weight: number
    cost: number
    id: string
    index: number
}

type TypeForm = {
    name: string
    weight: number
    cost: number
    _id?: string
}

export const EditCorn: FC<MyProps> = ({_id, name, weight, cost, id, index}) => {
    const stores = useContext(StoreContext)
    const iconEdit = (<i className="material-icons">edit</i>)

    const showMessage = useMessage()
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
            const {corn, message} = data
            if (stores?.cornStore) {
                runInAction(() => {
                    stores.cornStore.allCorn[index] = corn
                })
            }
            showMessage(message)
        } catch (e) {

        }
    }
    if (loading) {
        return <Loader/>
    }

    return (
        <Modals textLink={iconEdit} id={id} modalTitle={'Редактирование зерна'} textCloseBtn={'Закрыть'}>
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
        </Modals>
    )
}
