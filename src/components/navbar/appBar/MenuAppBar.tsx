import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SideDrawer from "../sideDrawer/SideDrawer";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
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

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setShowDrawer(open);
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
            <IconButton
              aria-label="logout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            //   onClick={handleMenu}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <SideDrawer
        showDrawer={showDrawer}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
}

export default MenuAppBar;
