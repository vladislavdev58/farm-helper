import React from 'react'
import {Box, Typography} from '@material-ui/core'
import {MainLayout} from '../../layouts/MainLayout/MainLayout'
import {List, ListItem, ListItemText} from '@material-ui/core'

export const UpdatesPage = () => {
    return (
        <MainLayout>
            <Box my={5}>
                    <Typography variant="h2" component="h1">Что нового? 🧐</Typography>

                    <Typography variant="h4" component="h1">Версия 0.1.2</Typography>
                    <List>
                        <ListItem>
                            <ListItemText>- График продаж на главной странице работает. Можно увидеть статистику продаж</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>- В цены и т.д. добавляются числа точкой (1.5)</ListItemText>
                        </ListItem>
                    </List>
            </Box>
        </MainLayout>
    )
}