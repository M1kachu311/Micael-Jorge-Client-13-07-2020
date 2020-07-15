import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MailBox from "../components/mailBox";
import Sidebar from "../components/sidebar";
import NewMailForm from "../components/newMailForm";
import { getAllEmails } from "../api/messages";
import { getMails } from "../actions/messages";
import RefreshIcon from "@material-ui/icons/Refresh";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  title: {
    flexGrow: 1,
  },
  refreshButton:{
     color: "white", marginLeft: "auto" 
  }
}));

function MainDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.username);
  const token = useSelector((state) => state.auth.token);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const selectedMailbox = useSelector((state) => state.mailbox.selectedPage);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isFetched = useSelector((state) => state.messages.fetched);
  const setMessages = async () => {
    try {
      const messages = await getAllEmails(token);
      dispatch(getMails(messages));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    (() => {
      if (!isLoggedIn) {
        history.push("/login");
      }
      if (isLoggedIn && !isFetched) {
        setMessages();
      }
    })();
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  const drawer = (
    <div>
      <Sidebar onClose={handleDrawerClose}/>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Hello {userName}
          </Typography>
          <IconButton
            className={classes.refreshButton}
            size="medium"
            aria-label="refresh mailboxes"
            component="span"
            onClick={setMessages}
          >
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {selectedMailbox === "inbox" ? <MailBox refreshMessages={setMessages} type={"inbox"} /> : ""}
        {selectedMailbox === "outbox" ? <MailBox refreshMessages={setMessages} type={"outbox"} /> : ""}
        {selectedMailbox === "compose" ? (
          <NewMailForm refreshMessages={setMessages} />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default MainDrawer;
