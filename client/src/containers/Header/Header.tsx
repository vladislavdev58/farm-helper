import React, {FC, useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {Sidebar} from '../Sidebar/Sidebar'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import StoreContext from '../../context/StoreContext'


export const Header: FC = () => {
    const stores = useContext(StoreContext)
    const logout = () => {
        if (stores?.userStore) {
            stores.userStore.token = null
            stores.userStore.userId = null
            localStorage.removeItem('userData')
        }
    }
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
                color: '#fff'
            },
        }),
    )
    const classes = useStyles()
    const [openSidebar, setOpenSidebar] = useState<boolean>(false)
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setOpenSidebar(!openSidebar)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography component={Link} to={'/'} variant="h6" className={classes.title}>
                        Компания
                    </Typography>
                    <Button startIcon={<ExitToAppIcon/>} color="inherit" onClick={logout}>Выйти</Button>
                </Toolbar>
            </AppBar>
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
        </>
        // <div>
        //     <nav className='light-blue lighten-5 black-text'>
        //         <div className="nav-wrapper">
        //             <ul className="left hide-on-med-and-down">
        //                 <li><span onClick={() => setIsShow(!isShow)}><i className="material-icons"
        //                                                                 style={styleMenu}>menu</i></span></li>
        //             </ul>
        //             <ul className='right hide-on-med-and-down'>
        //                 <li>
        //                     <a href='#!' className='black-text' onClick={() => auth.logout()}>Выйти</a>
        //                 </li>
        //                 <li>
        //                     <Link className='black-text' to='/add-corn'>Зерно</Link>
        //                 </li>
        //                 <li>
        //                     <Link className='black-text' to='/poisons'>Яды</Link>
        //                 </li>
        //                 <li>
        //                     <Link className='black-text' to='/add-sale'>Продажи</Link>
        //                 </li>
        //             </ul>
        //         </div>
        //     </nav>
        // </div>


    )
}
