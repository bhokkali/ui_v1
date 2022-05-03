import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import logo from '../../assets/images/logo.png'

const useStyles = makeStyles(theme => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
      flex: 1,
      textAlign: 'left'
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
      background: '#ef693708'
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
      cursor: 'pointer',
      color: '#333',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    schoolInfoBlock: {
      height: 50,
      borderRadius: 5,
      background: '#265985',
      padding: '0px 5px',
      color: '#fff',
      minWidth: 200,
      textAlign: 'center'
    },
    schoolInfoName: {
      fontSize: 18,
      marginTop: 5
    },
    schoolInfoYear: {
      fontSize: 14
    },
    logoImg: {
      cursor: "pointer"
    }
  }));


const sections = [ {
    name: 'Home',
    path: "/"
},{
    name: 'About Us',
    path: "/page/about"
},{
    name: 'Features',
    path: "/page/features"
},/*{
    name: 'Testimonials',
    path: "#"
},{
    name: 'Demo',
    path: "/page/demo"
},{
    name: 'Events',
    path: "#"
},*/{
    name: 'Contact Us',
    path: "/page/contact"
},{
  name: 'Privacy',
  path: "/page/privacy"
}];

export default function Header(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
            onClick={() => props.history.push('/')}
          >
            <img src={logo} className={classes.logoImg} />
          </Typography>
          
          
          {(props.authInfo && props.authInfo.data && props.authInfo.isAuth) ? (
            <React.Fragment>
              {(!props.authInfo.data.isAdmin) ? (
                <div className={classes.schoolInfoBlock}>
                  <div className={classes.schoolInfoName}>{props.authInfo.data.school_name}</div>
                  <div className={classes.schoolInfoYear}>{props.authInfo.data.academic_year}</div>
                </div>
              ) : (
                <div className={classes.schoolInfoBlock}>
                  <div className={classes.schoolInfoName}>Admin</div>
                </div>
              )}
              
              <Link to="/km?p=dashboard" className={classes.toolbarLink} >
                MyAccount
              </Link>
              |
              <Link onClick={props.logoutCB} className={classes.toolbarLink} >
                Logout
              </Link>
            </React.Fragment>
            
          ): (
            <Link to="/login" className={classes.toolbarLink} >
              Login
            </Link>
          )}
          
        </Toolbar>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map(section => (
            <Link
              color="inherit"
              noWrap
              key={section}
              variant="body2"
              to={section.path}
              className={classes.toolbarLink}
            >
              {section.name}
            </Link>
          ))}
          </Toolbar>
        <Divider />
        </React.Fragment>
    )
}