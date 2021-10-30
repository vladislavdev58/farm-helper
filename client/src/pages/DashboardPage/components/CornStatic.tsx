import React, {useContext} from 'react'
import {Button, Card, CardContent, Typography} from '@material-ui/core'
import {Pie} from 'react-chartjs-2/dist'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import StoreContext from '../../../context/StoreContext'

export const CornStatic = observer(() => {
    const stores = useContext(StoreContext)
    const getDatacorn = () => {
        const obj = {
            labels: stores?.cornStore.getAllName(),
            datasets: [
                {
                    data: stores?.cornStore.getAllWeight(),
                    backgroundColor: stores?.cornStore.getAllColor(0),
                    borderColor: stores?.cornStore.getAllColor(1),
                    borderWidth: 1,
                },
            ],
        }
        return obj
    }

    if (!stores?.cornStore.allCorn.length) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Общее количество зерна
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Для начала заполните данные
                    </Typography>
                    <Button size="medium" color="primary" component={Link} to={'/corn'}>
                        Заполнить
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardContent>
                <Pie data={getDatacorn()}/>
                <Typography variant="h5" component="h2">
                    Общее количество зерна
                </Typography>
            </CardContent>
        </Card>
    )
})
