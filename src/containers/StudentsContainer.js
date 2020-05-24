import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import StudentDashboard from '../components/Students/StudentDashboard'
import AddStudent from '../components/Students/AddStudent'
import ListStudents from '../components/Students/ListStudents'
import AcademicStudents from '../components/Students/AcademicStudents'
import AddStudentsMarks from '../components/Students/AddStudentsMarks'
import StudentAttendance from '../components/Students/StudentAttendance'
import StudentsPromotion from '../components/Students/StudentsPromotion'
import StudentAttendanceCalendar from '../components/Students/StudentAttendanceCalendar'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { createUpdateStudent } from '../store/Students/actionCreator'
import { getSchoolStudents, 
  getAcademicStudents, 
  submitMarks, 
  getExamGradeMarks, 
  getExamReports, 
  createUpdateExamReport,
  getAcademicStudentsAttendance,
  createUpdateStudentAttendance,
  getAllExamReports,
  updateAcademicPromotion,
  getStudentAttendanceCalendar,
  removeMarkUpdatedStatus
 } from '../store/Students/actionCreator'
import { getSchoolGradesList } from '../store/SchoolGrades/actionCreator'
import { getExamsList, getExamTimeTable } from '../store/Exams/actionCreator'
import { getParentInfo } from '../store/Parents/actionCreator'
import { getAcademicYearInfoFromYearString } from '../store/Masters/actionCreator'

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

class StudentsContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: ''
  };

  componentDidMount() {
    if(this.props.authInfo.data) {
      //if(this.props.listSchoolStudents) this.props.getSchoolStudents(this.props.authInfo.data.id)
      if(this.props.schoolGradesList) this.props.getSchoolGradesList(this.props.authInfo.data.id, this.props.authInfo.data.academic_year_id)
      if(this.props.listExams)  this.props.getExamsList(this.props.authInfo.data.id, this.props.authInfo.data.academic_year_id)
    }
  }


  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      location, 
      history,
      createUpdateStudent,
      listSchoolStudents,
      schoolGradesList,
      getAcademicStudents,
      listAcademicGradeStudents,
      listExams,
      getExamTimeTable,
      listExamTimeTable,
      submitMarks,
      getExamGradeMarks,
      listExamGradeMarks,
      getExamReports,
      listExamReports,
      createUpdateExamReport,
      getAcademicStudentsAttendance,
      listStudentsAttendance,
      createUpdateStudentAttendance,
      getAllExamReports,
      listAllExamReports,
      updateAcademicPromotion,
      getStudentAttendanceCalendar,
      listStudentAttendanceCalendar,
      getParentInfo,
      parentDetails,
      getAcademicYearInfoFromYearString,
      nextAcademicGrades,
      removeMarkUpdatedStatus,
      marksUpatedStatus,
      getSchoolStudents
    } = props
    
    const paramResult = getUrlParams(location.search)
    let pageContent = <StudentDashboard />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'add':
        pageContent = <AddStudent
          authInfo={authInfo.data} 
          history={history}
          createUpdateStudentCB={createUpdateStudent}
          parentId={paramResult.p.split("_")[2]}
          schoolGradesList={schoolGradesList}
          getParentInfo={getParentInfo}
          parentDetails={parentDetails}
          mode="Add"
        />

        dispName = "Add Student"
        break;
      case 'list':
        pageContent = <ListStudents 
          authInfo={authInfo.data} 
          history={history}
          listSchoolStudents={listSchoolStudents}
          getSchoolStudents={getSchoolStudents}
        />
        dispName = "List Students"
        break;
      case 'academicList':
        pageContent = <AcademicStudents 
          authInfo={authInfo.data} 
          history={history}
          schoolGradesList={schoolGradesList}
          getAcademicStudents={getAcademicStudents}
          listAcademicGradeStudents={listAcademicGradeStudents}
        />
        dispName = "Academic Students"
        break;
      case 'attendance':
        pageContent = <StudentAttendance 
          authInfo={authInfo.data} 
          history={history}
          schoolGradesList={schoolGradesList}
          getAcademicStudents={getAcademicStudents}
          listAcademicGradeStudents={listAcademicGradeStudents}
          getAcademicStudentsAttendance={getAcademicStudentsAttendance}
          listStudentsAttendance={listStudentsAttendance}
          createUpdateStudentAttendance={createUpdateStudentAttendance}
        />
        dispName = "Students Attendance"
        break;
      case 'attendanceCalendar':
        pageContent = <StudentAttendanceCalendar
          authInfo={authInfo.data} 
          history={history}
          schoolGradesList={schoolGradesList}
          getStudentAttendanceCalendar={getStudentAttendanceCalendar}
          listStudentAttendanceCalendar={listStudentAttendanceCalendar}
        />
        dispName = "Students Attendance"
        break;
      case 'edit':
        let selectedObj = '';
        if(paramResult.p.split("_")[2]) {
          selectedObj = _.find(listSchoolStudents, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }
        pageContent = <AddStudent 
          authInfo={authInfo.data} 
          history={history}
          createUpdateStudentCB={createUpdateStudent}
          selectedStudentInfo={selectedObj}
          schoolGradesList={schoolGradesList}
          mode="Edit"
        />

        dispName = "Edit Student"
        break;
      case 'addMarks':
        pageContent = <AddStudentsMarks 
          authInfo={authInfo.data} 
          history={history}
          listAcademicGradeStudents={listAcademicGradeStudents}
          listExams={listExams}
          schoolGradesList={schoolGradesList}
          getAcademicStudents={getAcademicStudents}
          getExamTimeTable={getExamTimeTable}
          listExamTimeTable={listExamTimeTable}
          submitMarks={submitMarks}
          getExamGradeMarks={getExamGradeMarks}
          listExamGradeMarks={listExamGradeMarks}
          getExamReports={getExamReports}
          listExamReports={listExamReports}
          createUpdateExamReport={createUpdateExamReport}
          removeMarkUpdatedStatus={removeMarkUpdatedStatus}
          marksUpatedStatus={marksUpatedStatus}
        />

        dispName = "Add Students Marks"
        break;
      case 'promotion': 
        pageContent = <StudentsPromotion 
          authInfo={authInfo.data} 
          history={history}
          listAcademicGradeStudents={listAcademicGradeStudents}
          schoolGradesList={schoolGradesList}
          getAcademicStudents={getAcademicStudents}
          getAllExamReports={getAllExamReports}
          listAllExamReports={listAllExamReports}
          updateAcademicPromotion={updateAcademicPromotion}
          getAcademicYearInfoFromYearString={getAcademicYearInfoFromYearString}
          nextAcademicGrades={nextAcademicGrades}
        />

        dispName = "Students Promotion"
        break;
      default:
        pageContent = <StudentDashboard />
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
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=students" className={classes.textLink}>Students</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

StudentsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createUpdateStudent,
    getSchoolStudents,
    getSchoolGradesList,
    getAcademicStudents,
    getExamsList,
    getExamTimeTable,
    submitMarks,
    getExamGradeMarks,
    getExamReports,
    createUpdateExamReport,
    getAcademicStudentsAttendance,
    createUpdateStudentAttendance,
    getAllExamReports,
    updateAcademicPromotion,
    getStudentAttendanceCalendar,
    getParentInfo,
    getAcademicYearInfoFromYearString,
    removeMarkUpdatedStatus
  }, dispatch)

  const mapStateToProps = state => ({
    listSchoolStudents: state.Students.listSchoolStudents,
    listAcademicGradeStudents: state.Students.listAcademicGradeStudents,
    schoolGradesList: state.Grades.schoolGradesList,
    listExams: state.Exams.listExams,
    listExamTimeTable: state.Exams.listExamTimeTable,
    listExamGradeMarks: state.Students.listExamGradeMarks,
    listExamReports: state.Students.listExamReports,
    listStudentsAttendance: state.Students.listStudentsAttendance,
    listAllExamReports: state.Students.listAllExamReports,
    listStudentAttendanceCalendar: state.Students.listStudentAttendanceCalendar,
    parentDetails: state.Parents.parentDetails,
    nextAcademicGrades: state.Grades.nextAcademicGrades,
    marksUpatedStatus: state.Students.marksUpatedStatus
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentsContainer))