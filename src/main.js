import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import Collapse from '@material-ui/core/Collapse';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TuneIcon from '@material-ui/icons/Tune';
import TableChartIcon from '@material-ui/icons/TableChart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SaveIcon from '@material-ui/icons/Save';
import BusinessIcon from '@material-ui/icons/Business';
import SecurityIcon from '@material-ui/icons/Security';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import PaymentIcon from '@material-ui/icons/Payment';
import { Link } from 'react-router-dom';

const drawerWidth = 280;



const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarShift: {
    marginLeft: drawerWidth,
    background: '#8c9eff',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    background: '#8c9eff'
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(0deg)"
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(180deg)"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "1.5px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  listItemText:{
    fontSize:'1.5em',
    color:'#3949ab'
  },

  list:{
    background: '#EDE7F6'
  }
});

class MiniDrawer extends React.Component {
  state = {
    openUser: false,
    openAccounts: false,
    openNomina: false,
    openConfig: false,
    openConfiguration: false,
    openHv:false,
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes} = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);


   const handleClickAccounts = () => {
    this.setState({openAccounts: !this.state.openAccounts});
  };

   const handleClickNomina = () => {
    this.setState({openNomina: !this.state.openNomina});
  };

   const handleClickConfig = () => {
    this.setState({openConfig: !this.state.openConfig});
  };

  const handleClick = () => {
     this.setState({openUser: !this.state.openUser});
  };

  const handleClickHv = () => {
    this.setState({openHv: !this.state.openHv});
 };


    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          fooJon={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={true}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon
                classes={{
                  root: this.state.open
                    ? classes.menuButtonIconOpen
                    : classes.menuButtonIconClosed
                }}
              />
            </IconButton>
            <Typography
              variant="h4"
              color="inherit"
              className={classes.grow}
              noWrap
            >
              MiPymes Gestión de Nómina
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer

          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} />
          <List className={classes.list}>
           
            <ListItem button onClick={handleClickHv}>
        <ListItemIcon>
          <PermContactCalendarIcon />
        </ListItemIcon>
          
          <ListItemText primary="Gestión HV" classes={{primary:classes.listItemText}}/>
          {open ? <ExpandLess /> : <ExpandMore />}
        
      </ListItem>
      <Collapse in={this.state.openHv} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          <ListItem button className={classes.nested}>
          <Link to="/gestion_hv">
            <ListItemIcon>
              <ToggleOnIcon />
            </ListItemIcon>
          </Link>
              <Link to="/gestion_hv">
              <ListItemText primary="Registro" />
              </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
          <Link to="/gestion_hv">
            <ListItemIcon>
              <ToggleOnIcon />
            </ListItemIcon>
          </Link>
              <Link to="/gestion_hv">
              <ListItemText primary="Ver Hojas de vida" />
              </Link>
          </ListItem>
          </List>
          </Collapse>
       <Divider />
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <HowToRegIcon />
        </ListItemIcon>
        <ListItemText primary="Empleados" classes={{primary:classes.listItemText}}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.openUser} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          <ListItem button className={classes.nested}>
          <Link to="/empleados_activos">
            <ListItemIcon>
              <ToggleOnIcon />
            </ListItemIcon>
          </Link>
              <Link to="/empleados_activos">
              <ListItemText primary="Activos" />
              </Link>
          </ListItem>

          <ListItem button className={classes.nested}>
          <Link to="/empleados_inactivos">
            <ListItemIcon>
              <ToggleOffIcon />
            </ListItemIcon>
            </Link>
               <Link to="/empleados_inactivos">
              <ListItemText primary="Inactivos" />
              </Link>
          </ListItem>

                     
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
         
             <Link to="/gestion_empleados">
              <ListItemText primary="Crear Empleado" />
            </Link>
            
          </ListItem>

          </List>
          </Collapse>

 <Divider />

      <ListItem button onClick={handleClickAccounts}>
        <ListItemIcon>
          <SupervisorAccountIcon  />
        </ListItemIcon>
        <ListItemText primary="Cuentas" classes={{primary:classes.listItemText}}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.openAccounts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
           
              
              <ListItemText primary="Listar cuentas" />
         
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <Link to="gestion_cuentas">
              <ListItemText primary="Crear cuenta" />
                 </Link>

                     </ListItem>
         
          </List>
          </Collapse>
          <Divider />

  <ListItem button onClick={handleClickNomina}>
        <ListItemIcon>
          <TableChartIcon />
        </ListItemIcon>
        <ListItemText primary="Nómina" classes={{primary:classes.listItemText}} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.openNomina} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
           
            <Link to="ver_nomina">
              <ListItemText primary="Pagadas" />
              </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
             <Link to="crear_nomina">
              <ListItemText primary="Generar Nómina" />
                 </Link>

                     </ListItem>
                     <ListItem button className={classes.nested}>
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
             <Link to="ver_planilla">
              <ListItemText primary="Planilla" />
                 </Link>

                     </ListItem>

          </List>
          </Collapse>
          <Divider /> 




  <ListItem button onClick={handleClickConfig}>
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Configuración" classes={{primary:classes.listItemText}} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.openConfig} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
           
               <Link to="/">
              <ListItemText primary="Datos Empresa" />
                </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
           
              <ListItemText primary="Tarifa seguridad social" />
                     </ListItem>

          <ListItem button className={classes.nested}>
           <Link to="/parametros_legales">
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
          </Link>
               <Link to="/parametros_legales">
              <ListItemText primary="Parametros Legales" />
              </Link>
          </ListItem>
         
        <ListItem button className={classes.nested}>
           <Link to="/crear_entidad">
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
          </Link>
               <Link to="/crear_entidad">
              <ListItemText primary="Información terceros" />
              </Link>
          </ListItem>

           <ListItem button className={classes.nested}>
            <ListItemIcon>
              <HourglassFullIcon />
            </ListItemIcon>
         
             
              <ListItemText primary="Tarifa horas extra" />
            
          </ListItem>

           <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
         
             
              <ListItemText primary="Recargos" />
            
          </ListItem>

          </List>
          </Collapse>
          <Divider />



           </List>
        </Drawer>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
