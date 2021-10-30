import React from 'react'
import {List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core'
import {Link} from 'react-router-dom'
import ToysIcon from '@material-ui/icons/Toys'
import BugReportIcon from '@material-ui/icons/BugReport'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import UpdateIcon from '@material-ui/icons/Update'

export const MenuList = () => {
    return(
        <List>
            <ListItem button component={Link} to={'/corn'}>
                <ListItemIcon><ToysIcon/></ListItemIcon>
                <ListItemText primary={'Зерно'}/>
            </ListItem>
            <ListItem button component={Link} to={'/poisons'}>
                <ListItemIcon><BugReportIcon/></ListItemIcon>
                <ListItemText primary={'Яды'}/>
            </ListItem>

            <ListItem button component={Link} to={'/sale'}>
                <ListItemIcon><MonetizationOnIcon/></ListItemIcon>
                <ListItemText primary={'Продажи'}/>
            </ListItem>
<Divider/>
            <ListItem button component={Link} to={'/updates'}>
                <ListItemIcon><UpdateIcon/></ListItemIcon>
                <ListItemText primary={'Обновления'}/>
            </ListItem>
        </List>
    )
}
