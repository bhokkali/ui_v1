import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import TeacherAttendanceDashboard from '../components/TeacherAttendance/TeacherAttendanceDashboard'
import AddTeacherAttendance from '../components/TeacherAttendance/AddTeacherAttendance'
import TeacherAttendanceCalendar from '../components/TeacherAttendance/TeacherAttendanceCalendar'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { addTeacherAttendance, getTeacherAttendance } from '../store/TeacherAttendance/actionCreator'
import { getSchoolTeachers } from '../store/Teachers/actionCreator'

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
      if(this.props.listTeacherAttendance) this.props.getTeacherAttendance(this.props.authInfo.data.id, this.props.authInfo.data.academic_year_id)
      if(this.props.listSchoolTeachers) this.props.getSchoolTeachers(this.props.authInfo.data.id)
    }
  }


  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      location, 
      history,
      addTeacherAttendance,
      listSchoolTeachers,
      listTeacherAttendance
    } = props
    
    const paramResult = getUrlParams(location.search)
    let pageContent = <TeacherAttendanceDashboard />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'add':
        pageContent = <AddTeacherAttendance
          authInfo={authInfo.data} 
          history={history}
          addTeacherAttendanceCB={addTeacherAttendance}
          listSchoolTeachers={listSchoolTeachers}
          mode="Add"
        />

        dispName = "Add Teache Attendance"
        break;
      case 'list':
        pageContent = <TeacherAttendanceCalendar 
          authInfo={authInfo.data} 
          history={history}
          listSchoolTeachers={listSchoolTeachers}
          listTeacherAttendance={listTeacherAttendance}
        />
        dispName = "Calendar"
        break;
      case 'edit':
        let selectedObj = '';
        if(paramResult.p.split("_")[2]) {
          selectedObj = _.find(listTeacherAttendance, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }
        pageContent = <AddTeacherAttendance 
          authInfo={authInfo.data} 
          history={history}
          addTeacherAttendanceCB={addTeacherAttendance}
          selectedTeacherInfo={selectedObj}
          mode="Edit"
        />

        dispName = "Edit Teacher Attendance"
        break;
      default:
        pageContent = <TeacherAttendanceDashboard />
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
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=teacherAttendance" className={classes.textLink}>Teacher Attendance</Link> > {dispName}
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
    addTeacherAttendance, 
    getTeacherAttendance,
    getSchoolTeachers
  }, dispatch)

  const mapStateToProps = state => ({
    listTeacherAttendance: state.TeacherAttendance.listTeacherAttendance,
    listSchoolTeachers: state.Teachers.listSchoolTeachers
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeachersContainer))