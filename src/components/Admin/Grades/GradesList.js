import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SimpleTable from '../../Common/Table/SimpelTable'
import LinkDisp from '../../Common/LinkDisp'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      iconStyle: {
        fontSize: 42,
        transform: 'rotate(90deg)'
      },
  };

export class GradesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columnDef: [],
            userRowData: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { adminGradesList } = props
        if (adminGradesList.length > 0) {
          // Construct column data
          let columnDef = Object.keys(adminGradesList[0])
          if(columnDef.indexOf('Action') === -1) {
              columnDef.push('Action')
          }
          //Construct Row Data
          let userRowData = []
          adminGradesList.map((obj) => {
            obj.Action = <LinkDisp 
              kmLink="/km?p=admin_gradesEdit" 
              kmLinkId={obj.id}
              kmLinkName="Edit" 
          /> 
            userRowData.push(obj)
          })
  
          return {
              columnDef,
              userRowData
          }
  
        }
      }


  

    render () {
        const { classes } = this.props
        const { columnDef, userRowData } = this.state

        return (
            <div className={classes.root}>
                <SimpleTable 
                    columnDef={columnDef} 
                    rows={userRowData}
                />
            </div>
        )
    }
}

GradesList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(GradesList)
