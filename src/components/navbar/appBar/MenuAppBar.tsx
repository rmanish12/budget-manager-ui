import React, { useState, KeyboardEvent, MouseEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SideDrawer from "../sideDrawer/SideDrawer";
import { onLogout } from "../../../actions/authAction";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAppDispatch } from "../../../store/hooks";

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
    },
  })
);

const MenuAppBar = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (
    event: KeyboardEvent | MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as KeyboardEvent).key === "Tab" ||
        (event as KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setShowDrawer(open);
  };

  const onLogoutHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(onLogout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BUDGET MANAGER
          </Typography>
          <div>
            <Tooltip title="Logout">
              <IconButton
                aria-label="logout"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onLogoutHandler}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      <SideDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default MenuAppBar;
