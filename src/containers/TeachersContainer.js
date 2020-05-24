import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import TeacherDashboard from '../components/Teachers/TeacherDashboard'
import AddTeacher from '../components/Teachers/AddTeacher'
import ListTeachers from '../components/Teachers/ListTeachers'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { createUpdateTeacher, getSchoolTeachers, checkAvailability } from '../store/Teachers/actionCreator'
import { getSubjectsMaster } from '../store/Masters/actionCreator'

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

class TeachersContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: ''
  };

  componentDidMount() {
    if(this.props.authInfo.data) {
      if(this.props.subjectsMaster)  this.props.getSubjectsMaster()
      if(this.props.listSchoolTeachers) this.props.getSchoolTeachers(this.props.authInfo.data.id)
    }
  }


  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      location,
      history,  
      subjectsMaster,
      createUpdateTeacher,
      listSchoolTeachers,
      checkAvailability,
      availableListTeacher
    } = props
    
    const paramResult = getUrlParams(location.search)
    let pageContent = <TeacherDashboard />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'add':
        pageContent = <AddTeacher 
          authInfo={authInfo.data} 
          history={history}
          createUpdateTeacherCB={createUpdateTeacher}
          subjectsMaster={subjectsMaster}
          checkAvailability={checkAvailability}
          availableListTeacher={availableListTeacher}
          mode="Add"
        />

        dispName = "Add Teacher"
        break;
      case 'list':
        pageContent = <ListTeachers 
          authInfo={authInfo.data} 
          listSchoolTeachers={listSchoolTeachers}
          subjectsMaster={subjectsMaster}
        />
        dispName = "List Teachers"
        break;
      case 'edit':
        let selectedObj = '';
        if(paramResult.p.split("_")[2]) {
          selectedObj = _.find(listSchoolTeachers, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }
        pageContent = <AddTeacher 
          authInfo={authInfo.data} 
          history={history}
          createUpdateTeacherCB={createUpdateTeacher}
          subjectsMaster={subjectsMaster}
          selectedTeacherInfo={selectedObj}
          checkAvailability={checkAvailability}
          availableListTeacher={availableListTeacher}
          mode="Edit"
        />

        dispName = "Edit Teacher"
        break;
      default:
        pageContent = <TeacherDashboard />
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
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=teachers" className={classes.textLink}>Teachers</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

TeachersContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getSubjectsMaster,
    createUpdateTeacher,
    getSchoolTeachers,
    checkAvailability
  }, dispatch)

  const mapStateToProps = state => ({
    subjectsMaster: state.Masters.subjectsMaster,
    listSchoolTeachers: state.Teachers.listSchoolTeachers,
    availableListTeacher: state.Teachers.availableListTeacher
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeachersContainer))