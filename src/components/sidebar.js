import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InboxIcon from '@material-ui/icons/Inbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SendIcon from '@material-ui/icons/Send';
import Divider from "@material-ui/core/Divider";
import { logout } from "../actions/auth";
import { clearMails} from "../actions/messages";
import {goToInbox,goToOutbox,goToCompose} from "../actions/mailbox"
import { useDispatch,useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));


export default function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedPage=useSelector(state=>state.mailbox.selectedPage)
  const handleLogout = (e) => {
    dispatch(clearMails());
    dispatch(logout());
  };
  return (
    <div>
      <div className={classes.toolbar} />
     <Divider />
      <List component="nav" aria-label="main mailbox folders">
      <ListItem selected={selectedPage==="compose"} button onClick={()=>{
          dispatch(goToCompose())
        }}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Compose" />
        </ListItem>
        <ListItem selected={selectedPage==="inbox"} button onClick={()=>{
          dispatch(goToInbox())
        }}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem selected={selectedPage==="outbox"} button onClick={()=>{
          dispatch(goToOutbox())
        }}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Outbox" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
}
