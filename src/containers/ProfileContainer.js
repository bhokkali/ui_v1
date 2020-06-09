import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import UpdateProfile from '../components//Profile/UpdateProfile'
import ChangePassword from '../components//Profile/ChangePassword'
import ProifleDashboard from '../components//Profile/ProifleDashboard'
import AddSubadmin from '../components/Profile/AddSubadmin'
import ListSubadmin from '../components/Profile/ListSubadmin.js'
import { 
  updateUserInfo, 
  updatePassword,
  createUpdateSubadmin,
  getSubadmins
 } from '../store/Profile/actionCreator'
import { getPermissionsList } from '../store/Admin/actionCreator'
import { getUrlParams } from '../components/Common/Utility/Utils'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  breadCrumbs: {
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  rootContent: {
    backgroundColor: theme.palette.background.paper,
    padding: 5,
  },
  textLink: {
    cursor: 'pointer',
    fontSize: 15,
    color: '#1976d2',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
});

class ProfileContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: ''
  };

  componentDidMount() {
    this.props.getSubadmins(this.props.authInfo.data.id)
    this.props.getPermissionsList()
  }

  static getDerivedStateFromProps(props, state) {
    const { 
      authInfo, 
      location, 
      history,
      updateUserInfo, 
      updatePassword,
      createUpdateSubadmin,
      listSubadmins,
      adminPermissionsList
    } = props
    const paramResult = getUrlParams(location.search)
    let pageContent = <ProifleDashboard authInfo={authInfo.data} />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'update':
        pageContent = <UpdateProfile authInfo={authInfo.data} updateUserInfoCB={updateUserInfo} />
        dispName = "Update Profile"
        break;
      case 'changePassword':
        pageContent = <ChangePassword authInfo={authInfo.data} updatePasswordCB={updatePassword}/>
        dispName = "Change Password"
        break;
      case 'addSubadmin':
        pageContent = <AddSubadmin 
          authInfo={authInfo.data} 
          mode="Add"
          createUpdateSubadminCB={createUpdateSubadmin}
          history={history}
          adminPermissionsList={adminPermissionsList}
        />
        dispName = "Add Subadmin"
        break;
      case 'editSubadmin':
        let selectedObj = '';
        if(paramResult.p.split("_")[2]) {
          selectedObj = _.find(listSubadmins, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }
        pageContent = <AddSubadmin 
          authInfo={authInfo.data} 
          mode="Edit"
          createUpdateSubadminCB={createUpdateSubadmin}
          selectedSubadminInfo={selectedObj}
          history={history}
          adminPermissionsList={adminPermissionsList}
        />
        dispName = "Edit Subadmin"
        break;
      case 'subadmins':
        pageContent = <ListSubadmin 
          authInfo={authInfo.data} 
          listSubadmins={listSubadmins}
        />
        dispName = "List Subadmin"
        break;
      default:
        pageContent = <ProifleDashboard authInfo={authInfo.data} />
        dispName = ''
        break;
    }
    return {
        currentSubPage: pageContent,
        dispName
    }
    
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, authInfo } = this.props;
    const { currentSubPage, dispName } = this.state;
    
    return (
      <div className={classes.root}>
        <div className={classes.breadCrumbs}>
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=profile" className={classes.textLink}>My Profile</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateUserInfo,
    updatePassword,
    createUpdateSubadmin,
    getSubadmins,
    getPermissionsList
  }, dispatch)

  const mapStateToProps = state => ({
    listSubadmins: state.Profile.listSubadmins,
    adminPermissionsList: state.Admin.adminPermissionsList
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileContainer))