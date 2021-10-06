import React, {useState} from 'react'
import {MainLayout} from '../layouts/MainLayout/MainLayout'
import {AddCorn} from '../components/AddCorn'
import {CornTable} from '../components/CornTable'
import {Box, Button, Grid, Typography} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveIcon from '@material-ui/icons/Remove'
import {observer} from 'mobx-react-lite'

export const CornPage = observer(() => {
    const [isShowForm, setIsShowForm] = useState<boolean>(false)
    return (
        <MainLayout>
            <Box my={5}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h2" component="h1">Зерно</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={isShowForm ? <RemoveIcon/> : <AddCircleIcon/>}
                        onClick={() => setIsShowForm(!isShowForm)}
                    >
                        {isShowForm ? 'Закрыть' : 'Добавить культуру'}
                    </Button>
                </Grid>
            </Box>

            {isShowForm && <AddCorn/>}
            <CornTable/>
        </MainLayout>
    )
})
