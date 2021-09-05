import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'; //Gestion HV
import PostAddIcon from '@material-ui/icons/PostAdd';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import HowToRegIcon from '@material-ui/icons/HowToReg';//Empleados
import VisibilityIcon from '@material-ui/icons/Visibility';

import TuneIcon from '@material-ui/icons/Tune';
import TableChartIcon from '@material-ui/icons/TableChart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';

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

const styles = (theme) => ({
	root: {
		display: 'flex',
		
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor:"#0f4c75"
	},
	appBarShift: {
		marginLeft: drawerWidth,
		//background: '#8c9eff',
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
		background: '#0f4c75',
	},
	menuButtonIconClosed: {
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		transform: 'rotate(0deg)',
	},
	menuButtonIconOpen: {
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		transform: 'rotate(180deg)',
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		backgroundColor:"#ffffff"
	},
	drawerOpen: {
		width: drawerWidth,
		backgroundColor:"#e7eff7",
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
			
		}),
	},
	drawerClose: {
		backgroundColor:"#e7eff7",
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 0 + 0,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 8 + 0,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing.unit,
		justifyContent: 'flex-end',
		padding: '1.5px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		backgroundColor:"#ffffff"
	},
	grow: {
		flexGrow: 1,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},

	listItemText: {
		fontSize: '1.5em',
		color: '#1b262c',
	},

	list: {
		background: '#e7eff7',
	},

	icon:{
		fontSize: '1.5em',
		color: '#1b262c',
	}
});

class MiniDrawer extends React.Component {
	state = {
		openUser: false,
		openAccounts: false,
		openNomina: false,
		openConfig: false,
		openConfiguration: false,
		openHv: false,
		anchorEl: null,
	};

	handleDrawerOpen = () => {
		this.setState({ open: !this.state.open });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};
	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes } = this.props;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);

		const handleClickNomina = () => {
			this.setState({ openNomina: !this.state.openNomina });
		};

		const handleClickConfig = () => {
			this.setState({ openConfig: !this.state.openConfig });
		};

		const handleClickEmp = () => {
			this.setState({ openUser: !this.state.openUser });
		};

		const handleClickHv = () => {
			this.setState({ openHv: !this.state.openHv });
		};

		return (
			<div>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classes.appBar}
					fooJon={classNames(classes.appBar, {
						[classes.appBarShift]: this.state.open,
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
										: classes.menuButtonIconClosed,
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
								aria-owns={open ? 'menu-appbar' : undefined}
								aria-haspopup="true"
								onClick={this.handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: this.state.open,
						[classes.drawerClose]: !this.state.open,
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open,
						}),
					}}
					open={this.state.open}
				>
					<div className={classes.toolbar} />
					<List className={classes.list}>
						<ListItem button onClick={handleClickHv}>
							<ListItemIcon>
								<PermContactCalendarIcon className={classes.icon} />
							</ListItemIcon>

							<ListItemText
								primary="Gestión HV"
								classes={{ primary: classes.listItemText }}
							/>
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={this.state.openHv} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button className={classes.nested}>
									<Link to="/gestion_hoja_de_vida">
										<ListItemIcon>
											<ToggleOnIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/gestion_hoja_de_vida"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Registrar Hoja de Vida"
											/>
										</Typography>
									</Link>
								</ListItem>
								<ListItem button className={classes.nested}>
									<Link to="/listar_hojas_de_vida">
										<ListItemIcon>
											<ToggleOnIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/listar_hojas_de_vida"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Ver Hojas de vida"
											/>
										</Typography>
									</Link>
								</ListItem>
							</List>
						</Collapse>
						<Divider />

						<ListItem button onClick={handleClickEmp}>
							<ListItemIcon>
								<HowToRegIcon className={classes.icon} />
							</ListItemIcon>

							<ListItemText
								primary="Empleados"
								classes={{ primary: classes.listItemText }}
							/>
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={this.state.openUser} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button className={classes.nested}>
									<Link to="/listar_empleados">
										<ListItemIcon>
											<VisibilityIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/listar_empleados"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Listar Empleados"
											/>
										</Typography>
									</Link>
								</ListItem>

							</List>
						</Collapse>
						<Divider />

						<ListItem button onClick={handleClickNomina}>
							<ListItemIcon>
								<TableChartIcon className={classes.icon} />
							</ListItemIcon>

							<ListItemText
								primary="Nóminas"
								classes={{ primary: classes.listItemText }}
							/>
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={this.state.openNomina} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button className={classes.nested}>
									<Link to="/nueva_nomina">
										<ListItemIcon>
											<SaveIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/nueva_nomina"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Generar Nómina"
											/>
										</Typography>
									</Link>
								</ListItem>

								<ListItem button className={classes.nested}>
									<Link to="/listar_nominas">
										<ListItemIcon>
											<VisibilityIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/listar_nominas"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Listar Nóminas"
											/>
										</Typography>
									</Link>
								</ListItem>
							</List>
						</Collapse>
						<Divider />

						<ListItem button onClick={handleClickConfig}>
							<ListItemIcon>
								<TableChartIcon className={classes.icon} />
							</ListItemIcon>

							<ListItemText
								primary="Configuración"
								classes={{ primary: classes.listItemText }}
							/>
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={this.state.openConfig} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button className={classes.nested}>
									<Link to="/">
										<ListItemIcon>
											<BusinessIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Datos de la Empresa"
											/>
										</Typography>
									</Link>
								</ListItem>

								<ListItem button className={classes.nested}>
									<Link to="/parametros_legales">
										<ListItemIcon>
											<ContactMailIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/parametros_legales"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Parametros Legales"
											/>
										</Typography>
									</Link>
								</ListItem>

								<ListItem button className={classes.nested}>
									<Link to="/crear_entidad">
										<ListItemIcon>
											<ContactMailIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/crear_entidad"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Información de Terceros"
											/>
										</Typography>
									</Link>
								</ListItem>

								<ListItem button className={classes.nested}>
									<Link to="/">
										<ListItemIcon>
											<SecurityIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Tarifa seguridad social"
											/>
										</Typography>
									</Link>
								</ListItem>

								<ListItem button className={classes.nested}>
									<Link to="/">
										<ListItemIcon>
											<HourglassFullIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Tarifa Horas Extra"
											/>
										</Typography>
									</Link>
								</ListItem>

								<ListItem button className={classes.nested}>
									<Link to="/">
										<ListItemIcon>
											<PaymentIcon className={classes.icon} />
										</ListItemIcon>
									</Link>
									<Link
										to="/"
										style={{ textDecoration: 'none' }}
									>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											color="primary"
										>
											<ListItemText 
												style={{ color: '#2E4053' }} 
												primary="Recargos"
											/>
										</Typography>
									</Link>
								</ListItem>
							</List>
						</Collapse>
						<Divider />
					</List>
				</Drawer>
				<main className={classes.content}>
        <div className={classes.toolbar} />
		</main>
			</div>
		);
	}
}

MiniDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
