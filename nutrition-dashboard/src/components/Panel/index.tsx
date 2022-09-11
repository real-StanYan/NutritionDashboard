import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import TableChartIcon from "@mui/icons-material/TableChart";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { logout } from "../../store/main";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./index.css";

export default function Panel() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(logout());
  };
  const handleBack = () => {
    setOpen(false);
  };
  return (
    <div className="panel-wrapper">
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"You sure you want sign out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>May cause user data lost</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleClose} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: "100vw" }}>
        <BottomNavigation
          showLabels
          value={value}
          className="nav"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link to="/datas" title="Datas">
            <BottomNavigationAction
              className="nav-icon"
              label="Datas"
              icon={<TableChartIcon />}
            />
          </Link>
          {/* <BottomNavigationAction
            className="nav-icon"
            label="Favorites"
            icon={<FavoriteIcon />}
          /> */}
          <Link to="/bodymeasure">
            <BottomNavigationAction
              href="/bodymeasure"
              className="nav-icon"
              label="BodyMeasure"
              icon={<AccessibilityNewIcon />}
            />
          </Link>
          <Link to="/userinfor" title="UserInfor">
            <BottomNavigationAction
              className="nav-icon"
              label="UserInfor"
              icon={<ContactEmergencyIcon />}
            />
          </Link>
        </BottomNavigation>
      </Box>
      <div className="power-btn" onClick={handleClickOpen}>
        <PowerSettingsNewIcon sx={{ fontSize: 40 }} />
      </div>
    </div>
  );
}
