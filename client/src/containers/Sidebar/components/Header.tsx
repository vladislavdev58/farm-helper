import React from 'react'
import {Box, Grid, Typography} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import logo from '../../../assets/images/logo.png'
import {Link} from 'react-router-dom'

export const Header = () => {
    return (
        <Box component='div' px={5} py={3}>
            <Link to='/'>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={4}>
                        <Avatar alt="Компания" src={logo}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h5" component="h5">
                            Компания
                        </Typography>
                    </Grid>
                </Grid>
            </Link>
        </Box>
    )
}
