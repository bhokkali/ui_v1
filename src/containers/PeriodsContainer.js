import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import PeriodDashboard from '../components/Periods/PeriodDashboard'
import AddPeriod from '../components/Periods/AddPeriod'
import ListPeriods from '../components/Periods/ListPeriods'
import { getUrlParams } from '../components/Common/Utility/Utils'
import { createUpdatePeriod, getSchoolPeriods} from '../store/Periods/actionCreator'

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

class PeriodsContainer extends React.Component {
  state = {
    value: 0,
    currentSubPage: '',
    dispName: ''
  };

  componentDidMount() {
    if(this.props.authInfo.data) {
      if(this.props.listSchoolPeriods) this.props.getSchoolPeriods(this.props.authInfo.data.id)
    }
  }


  static getDerivedStateFromProps(props, state) {
    const { authInfo, 
      location,
      history,
      createUpdatePeriod,
      listSchoolPeriods
    } = props
    
    const paramResult = getUrlParams(location.search)
    let pageContent = <PeriodDashboard />
    let dispName = ''
    switch(paramResult.p.split("_")[1]) {
      case 'add':
        pageContent = <AddPeriod
          authInfo={authInfo.data} 
          history={history}
          createUpdatePeriodCB={createUpdatePeriod}
          mode="Add"
        />

        dispName = "Add Period"
        break;
      case 'list':
        pageContent = <ListPeriods 
          authInfo={authInfo.data} 
          history={history}
          listSchoolPeriods={listSchoolPeriods}
        />
        dispName = "List Periods"
        break;
      case 'edit':
        let selectedObj = '';
        if(paramResult.p.split("_")[2]) {
          selectedObj = _.find(listSchoolPeriods, (n) => { return n.id === parseInt(paramResult.p.split("_")[2]) })
        }
        pageContent = <AddPeriod 
          authInfo={authInfo.data} 
          history={history}
          createUpdatePeriodCB={createUpdatePeriod}
          selectedPeriodInfo={selectedObj}
          mode="Edit"
        />

        dispName = "Edit Period"
        break;
      default:
        pageContent = <PeriodDashboard />
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
          <Link to="/km?p=dashboard" className={classes.textLink}>Dashboard</Link> > <Link to="/km?p=periods" className={classes.textLink}>Periods</Link> > {dispName}
        </div>
        <div className={classes.rootContent}>
          {currentSubPage}
        </div>
      </div>
    );
  }
}

PeriodsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createUpdatePeriod,
    getSchoolPeriods
  }, dispatch)

  const mapStateToProps = state => ({
    listSchoolPeriods: state.Periods.listSchoolPeriods
  })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PeriodsContainer))