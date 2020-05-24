import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import TimeTableDashboard from '../components/TimeTable/TimeTableDashboard'
import AddTimeTable from '../components/TimeTable/AddTimeTable'
import TeacherTimeTable from '../components/TimeTable/TeacherTimeTable'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { getSchoolTimeTable, createUpdateTimeTable, getGradeTimeTable, getTeacherTimeTable, getSchoolActiveSubjects} from '../store/TimeTable/actionCreator'
import { getAcademicYearsMaster } from '../store/Masters/actionCreator'
import { getSchoolGradesList } from '../store/SchoolGrades/actionCreator'
import { getSchoolPeriods} from '../store/Periods/actionCreator'
import { getSchoolTeachers, getSubjectTeachers } from '../store/Teachers/actionCreator'

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

class TimeTableContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: ''
  };

  componentDidMount() {
    if(this.props.authInfo.data) {
      if(this.props.listTimeTable) this.props.getSchoolTimeTable(this.props.authInfo.data.id, this.props.authInfo.data.academic_year_id)
      if(this.props.academicYearMaster) this.props.getAcademicYearsMaster()
      if(this.props.schoolGradesList) this.props.getSchoolGradesList(this.props.authInfo.data.id, this.props.authInfo.data.academic_year_id)
      if(this.props.listSchoolPeriods) this.props.getSchoolPeriods(this.props.authInfo.data.id)
      if(this.props.listActiveSubjects)  this.props.getSchoolActiveSubjects(this.props.authInfo.data.id)
      if(this.props.listSchoolTeachers) this.props.getSchoolTeachers(this.props.authInfo.data.id)
    }
  }


  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      listTimeTable,
      location,
      history,
      academicYearMaster,
      schoolGradesList,
      listSchoolPeriods,
      listActiveSubjects,
      listSchoolTeachers,
      getSubjectTeachers,
      subjectTeachers,
      createUpdateTimeTable,
      getGradeTimeTable,
      listGradeTimeTable,
      getTeacherTimeTable,
      listTeacherTimeTable
    } = props
    
    const paramResult = getUrlParams(location.search)
    let pageContent = <TimeTableDashboard />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'add':
        pageContent = <AddTimeTable 
          authInfo={authInfo.data}
          history={history}
          schoolGradesList={schoolGradesList}
          academicYearMaster={academicYearMaster}
          listSchoolPeriods={listSchoolPeriods}
          subjectsMaster={listActiveSubjects}
          listSchoolTeachers={listSchoolTeachers}
          getSubjectTeachersCB={getSubjectTeachers}
          subjectTeachers={subjectTeachers}
          createUpdateTimeTable={createUpdateTimeTable}
          getGradeTimeTable={getGradeTimeTable}
          listGradeTimeTable={listGradeTimeTable}
          //createUpdateTeacherCB={createUpdateTeacher}
          //subjectsMaster={subjectsMaster}
          mode="Add"
        />

        dispName = "Add Time Table"
        break;
      case 'teacher':
        pageContent = <TeacherTimeTable 
          authInfo={authInfo.data} 
          history={history}
          listTimeTable={listTimeTable}
          listSchoolTeachers={listSchoolTeachers}
          listSchoolPeriods={listSchoolPeriods}
          subjectsMaster={listActiveSubjects}
          getTeacherTimeTable={getTeacherTimeTable}
          listTeacherTimeTable={listTeacherTimeTable}
        />
        dispName = "List Time Table"
        break;
      case 'edit':
        let selectedObj = '';
        if(paramResult.p.split("_")[2]) {
          //selectedObj = _.find(listSchoolTeachers, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }
        pageContent = <AddTimeTable 
          authInfo={authInfo.data} 
          history={history}
          schoolGradesList={schoolGradesList}
          academicYearMaster={academicYearMaster}
          listSchoolPeriods={listSchoolPeriods}
          subjectsMaster={listActiveSubjects}
          listSchoolTeachers={listSchoolTeachers}
          getSubjectTeachersCB={getSubjectTeachers}
          subjectTeachers={subjectTeachers}
          createUpdateTimeTable={createUpdateTimeTable}
          getGradeTimeTable={getGradeTimeTable}
          listGradeTimeTable={listGradeTimeTable}
          //createUpdateTeacherCB={createUpdateTeacher}
          //selectedTeacherInfo={selectedObj}
          mode="Edit"
        />

        dispName = "Edit Time Table"
        break;
      default:
        pageContent = <TimeTableDashboard />
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
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=timeTable" className={classes.textLink}>Time Table</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

TimeTableContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getSchoolTimeTable,
    getAcademicYearsMaster,
    getSchoolGradesList,
    getSchoolPeriods,
    getSchoolActiveSubjects,
    getSchoolTeachers,
    getSubjectTeachers,
    createUpdateTimeTable,
    getGradeTimeTable,
    getTeacherTimeTable
  }, dispatch)

  const mapStateToProps = state => ({
    listTimeTable: state.TimeTable.listTimeTable,
    listGradeTimeTable: state.TimeTable.listGradeTimeTable,
    academicYearMaster: state.Masters.academicYearMaster,
    schoolGradesList: state.Grades.schoolGradesList,
    listSchoolPeriods: state.Periods.listSchoolPeriods,
    listActiveSubjects: state.TimeTable.listActiveSubjects,
    listSchoolTeachers: state.Teachers.listSchoolTeachers,
    subjectTeachers: state.Teachers.subjectTeachers,
    listTeacherTimeTable: state.TimeTable.listTeacherTimeTable
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TimeTableContainer))