import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import CalendarDashboard from '../components/Calendar/CalendarDashboard'
import AddCalendar from '../components/Calendar/AddCalendar'
import ListCalendar from '../components/Calendar/ListCalendar'
import GridCalendar from '../components/Calendar/GridCalendar'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { createUpdateSchoolCalendar, getSchoolCalendarList } from '../store/SchoolCalendar/actionCreator'

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

class CalendarContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: ''
  };

  componentDidMount() {
    if(this.props.authInfo.data) {
      if(this.props.getSchoolCalendarList) this.props.getSchoolCalendarList(this.props.authInfo.data.id, this.props.authInfo.data.academic_year_id)
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      location, 
      history,
      createUpdateSchoolCalendar,
      schoolCalendarList
    } = props

    const paramResult = getUrlParams(location.search)
    let pageContent = <CalendarDashboard />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'add':
        pageContent = <AddCalendar 
        authInfo={authInfo.data} 
        history={history}
        createUpdateSchoolCalendarCB={createUpdateSchoolCalendar}
        mode="Add"
        />

        dispName = "Add School Calenbar"
        break;
      case 'list':
        pageContent = <ListCalendar 
          authInfo={authInfo.data} 
          history={history}
          schoolCalendarList={schoolCalendarList}
        />
        dispName = "List School Calendar"
        break;
      case 'grid':
        pageContent = <GridCalendar 
          authInfo={authInfo.data} 
          history={history}
          schoolCalendarList={schoolCalendarList}
        />
        dispName = "List School Calendar Grid View"
        break;
      case 'edit':
          let selectedObj = '';
          if(paramResult.p.split("_")[2]) {
            selectedObj = _.find(schoolCalendarList, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
          }
          pageContent = <AddCalendar 
            authInfo={authInfo.data} 
            history={history}
            createUpdateSchoolCalendarCB={createUpdateSchoolCalendar}
            selectedCalendarInfo={selectedObj}
            mode="Edit"
          />
  
          dispName = "Edit School Calenbar"
          break;
      default:
        pageContent = <CalendarDashboard />
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
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=calendar" className={classes.textLink}>School Calendar</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

CalendarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createUpdateSchoolCalendar,
    getSchoolCalendarList
  }, dispatch)

  const mapStateToProps = state => ({
    schoolCalendarList: state.Calendar.schoolCalendarList
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CalendarContainer))