import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import DashboardBlock from '../../Dashboard/DashboardBlock'
import Share from '@material-ui/icons/Share'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: 300,
      },
      iconStyle: {
        fontSize: 42,
        transform: 'rotate(90deg)'
      },
  };

export class GradesDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: 'D'
        }
    }


    handleChange = (stName) => event => {
        this.setState({ [stName]: event.target.value })
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='Add New Grade'
                    link='/km?p=admin_gradesAdd'
                    disabled={false}
                />
                <DashboardBlock 
                    icon={<Share className={classes.iconStyle} />}
                    label='List Grades'
                    link='/km?p=admin_gradesList'
                    disabled={false}
                />
            </div>
        )
    }
}

GradesDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(GradesDashboard)
