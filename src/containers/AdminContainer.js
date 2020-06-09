import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import CalendarDashboard from '../components/Calendar/CalendarDashboard'
import AcademicYearsDashboard from '../components/Admin/AcademicYears/AcademicYearsDashboard'
import AcademicYearsAdd from '../components/Admin/AcademicYears/AcademicYearsAdd'
import AcademicYearsList from '../components/Admin/AcademicYears/AcademicYearsList'
import GradesDashboard from '../components/Admin/Grades/GradesDashboard'
import GradesAdd from '../components/Admin/Grades/GradesAdd'
import GradesList from '../components/Admin/Grades/GradesList'
import SchoolsDashboard from '../components/Admin/Schools/SchoolsDashboard'
import SchoolAdd from '../components/Admin/Schools/SchoolAdd'
import SchoolsList from '../components/Admin/Schools/SchoolsList'
import SubjectsDashboard from '../components/Admin/Subjects/SubjectsDashboard'
import SubjectsAdd from '../components/Admin/Subjects/SubjectsAdd'
import SubjectsList from '../components/Admin/Subjects/SubjectsList'
import PermissionsDashboard from '../components/Admin/Permissions/PermissionsDashboard'
import PermissionsAdd from '../components/Admin/Permissions/PermissionsAdd'
import PermissionsList from '../components/Admin/Permissions/PermissionsList'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { getAcademicYearsMaster } from '../store/Masters/actionCreator'
import { 
    createUpdateAcademicYear, 
    createUpdateSchool, 
    getSchoolsList, 
    createUpdateGrade, 
    getGradesList,
    createUpdateSubject,
    getSubjectsList,
    createUpdatePermission,
    getPermissionsList
} from '../store/Admin/actionCreator'

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

class AdminContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: '',
    dashboardLink: '', 
    dashboardText: ''
  };

  componentDidMount() {
    if(this.props.authInfo.data) {
      if(this.props.academicYearMaster) this.props.getAcademicYearsMaster()
      if(this.props.adminSchoolsList) this.props.getSchoolsList()
      if(this.props.adminGradesList) this.props.getGradesList()
      if(this.props.adminSubjectsList) this.props.getSubjectsList()
      if(this.props.adminPermissionsList) this.props.getPermissionsList()
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      location, 
      history,
      academicYearMaster,
      createUpdateAcademicYear,
      createUpdateSchool,
      adminSchoolsList,
      createUpdateGrade,
      adminGradesList,
      createUpdateSubject,
      adminSubjectsList,
      adminPermissionsList,
      createUpdatePermission
    } = props

    const paramResult = getUrlParams(location.search)
    let pageContent = <CalendarDashboard />
    let dispName = ''
    let dashboardText = ''
    let dashboardLink = ''
    switch(paramResult.p.split("_")[1]) {
    case 'academicYears':
        pageContent = <AcademicYearsDashboard 
        authInfo={authInfo.data} 
        history={history}
        />
        dashboardText = "Academic years"
        dashboardLink = "/km?p=admin_academicYears"
        dispName = ""
        break;
    case 'academicYearsAdd':
        pageContent = <AcademicYearsAdd
        authInfo={authInfo.data} 
        history={history}
        mode="Add"
        createUpdateAcademicYear={createUpdateAcademicYear}
        />
        dashboardText = "Academic years"
        dashboardLink = "/km?p=admin_academicYears"
        dispName = "Academic years Add"
        break;
    case 'academicYearsList':
        pageContent = <AcademicYearsList
        authInfo={authInfo.data} 
        history={history}
        academicYearMaster={academicYearMaster}
        />
        dashboardText = "Academic years"
        dashboardLink = "/km?p=admin_academicYears"
        dispName = "Academic years List"
        break;
    case 'schools':
        pageContent = <SchoolsDashboard 
        authInfo={authInfo.data} 
        history={history}
        />
        dashboardText = "Schools"
        dashboardLink = "/km?p=admin_schools"
        dispName = ""
        break;
    case 'schoolAdd':
        pageContent = <SchoolAdd
        authInfo={authInfo.data} 
        history={history}
        mode="Add"
        createUpdateSchool={createUpdateSchool}
        />
        dashboardText = "Schools"
        dashboardLink = "/km?p=admin_schools"
        dispName = "School Add"
        break;
    case 'schoolEdit':
        let selectedSchoolObj = '';
          if(paramResult.p.split("_")[2]) {
            selectedSchoolObj = _.find(adminSchoolsList, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
          }
        pageContent = <SchoolAdd
        authInfo={authInfo.data} 
        history={history}
        mode="Edit"
        createUpdateSchool={createUpdateSchool}
        selectedSchoolInfo={selectedSchoolObj}
        />
        dashboardText = "Schools"
        dashboardLink = "/km?p=admin_schools"
        dispName = "School Edit"
        break;
    case 'schoolsList':
        pageContent = <SchoolsList
        authInfo={authInfo.data} 
        history={history}
        adminSchoolsList={adminSchoolsList}
        />
        dashboardText = "Schools"
        dashboardLink = "/km?p=admin_schools"
        dispName = "Schools List"
        break;
    case 'grades':
        pageContent = <GradesDashboard 
        authInfo={authInfo.data} 
        history={history}
        />
        dashboardText = "Grades"
        dashboardLink = "/km?p=admin_grades"
        dispName = ""
        break;
    case 'gradesAdd':
        pageContent = <GradesAdd
        authInfo={authInfo.data} 
        history={history}
        mode="Add"
        createUpdateGrade={createUpdateGrade}
        />
        dashboardText = "Grades"
        dashboardLink = "/km?p=admin_grades"
        dispName = "Grade Add"
        break;
    case 'gradesEdit':
        let selectedGradeObj = '';
            if(paramResult.p.split("_")[2]) {
                selectedGradeObj = _.find(adminGradesList, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
            }
        pageContent = <GradesAdd
        authInfo={authInfo.data} 
        history={history}
        mode="Edit"
        createUpdateGrade={createUpdateGrade}
        selectedGradeInfo={selectedGradeObj}
        />
        dashboardText = "Grades"
        dashboardLink = "/km?p=admin_grades"
        dispName = "Grade Edit"
        break;
    case 'gradesList':
        pageContent = <GradesList
        authInfo={authInfo.data} 
        history={history}
        adminGradesList={adminGradesList}
        />
        dashboardText = "Grades"
        dashboardLink = "/km?p=admin_grades"
        dispName = "Grades List"
        break;
    case 'subjects':
        pageContent = <SubjectsDashboard 
        authInfo={authInfo.data} 
        history={history}
        />
        dashboardText = "Subjects"
        dashboardLink = "/km?p=admin_subjects"
        dispName = ""
        break;
    case 'subjectsAdd':
        pageContent = <SubjectsAdd
        authInfo={authInfo.data} 
        history={history}
        mode="Add"
        createUpdateSubject={createUpdateSubject}
        />
        dashboardText = "Subjects"
        dashboardLink = "/km?p=admin_subjects"
        dispName = "Subject Add"
        break;
    case 'subjectsEdit':
        let selectedSubjectObj = '';
            if(paramResult.p.split("_")[2]) {
                selectedSubjectObj = _.find(adminSubjectsList, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
            }
        pageContent = <SubjectsAdd
        authInfo={authInfo.data} 
        history={history}
        mode="Edit"
        createUpdateSubject={createUpdateSubject}
        selectedSubjectInfo={selectedSubjectObj}
        />
        dashboardText = "Subjects"
        dashboardLink = "/km?p=admin_subjects"
        dispName = "Subject Edit"
        break;
    case 'subjectsList':
        pageContent = <SubjectsList
        authInfo={authInfo.data} 
        history={history}
        adminSubjectsList={adminSubjectsList}
        />
        dashboardText = "Subjects"
        dashboardLink = "/km?p=admin_subjects"
        dispName = "Subjects List"
        break;
      case 'permissions':
          pageContent = <PermissionsDashboard 
          authInfo={authInfo.data} 
          history={history}
          />
          dashboardText = "Permissions"
          dashboardLink = "/km?p=admin_permissions"
          dispName = ""
          break;
      case 'permissionsAdd':
          pageContent = <PermissionsAdd
          authInfo={authInfo.data} 
          history={history}
          mode="Add"
          createUpdatePermission={createUpdatePermission}
          />
          dashboardText = "Permissions"
          dashboardLink = "/km?p=admin_permissions"
          dispName = "Permission Add"
          break;
      case 'permissionsEdit':
          let selectedPermissionObj = '';
              if(paramResult.p.split("_")[2]) {
                selectedPermissionObj = _.find(adminPermissionsList, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
              }
          pageContent = <PermissionsAdd
          authInfo={authInfo.data} 
          history={history}
          mode="Edit"
          createUpdatePermission={createUpdatePermission}
          selectedPermissionInfo={selectedPermissionObj}
          />
          dashboardText = "Permissions"
          dashboardLink = "/km?p=admin_permissions"
          dispName = "Permissions Edit"
          break;
      case 'permissionsList':
          pageContent = <PermissionsList
          authInfo={authInfo.data} 
          history={history}
          adminPermissionsList={adminPermissionsList}
          />
          dashboardText = "Permissions"
          dashboardLink = "/km?p=admin_permissions"
          dispName = "Permissions List"
          break;
      
      default:
        pageContent = <CalendarDashboard />
        dispName = ''
        break;
    }
    return {
        currentSubPage: pageContent,
        dispName,
        dashboardLink, 
        dashboardText
    }
    
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, authInfo } = this.props;
    const { currentSubPage, dispName, dashboardLink, dashboardText } = this.state;
    
    return (
      <div className={classes.root}>
        <div className={classes.breadCrumbs}>
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to={dashboardLink} className={classes.textLink}>{dashboardText}</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

AdminContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getAcademicYearsMaster,
    createUpdateAcademicYear,
    createUpdateSchool,
    getSchoolsList,
    createUpdateGrade,
    getGradesList,
    createUpdateSubject,
    getSubjectsList,
    createUpdatePermission,
    getPermissionsList
  }, dispatch)

  const mapStateToProps = state => ({
    academicYearMaster: state.Masters.academicYearMaster,
    adminSchoolsList: state.Admin.adminSchoolsList,
    adminGradesList: state.Admin.adminGradesList,
    adminSubjectsList: state.Admin.adminSubjectsList,
    adminPermissionsList: state.Admin.adminPermissionsList
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminContainer))