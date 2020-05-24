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

export class SubjectsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columnDef: [],
            userRowData: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { adminSubjectsList } = props
        if (adminSubjectsList.length > 0) {
          // Construct column data
          let columnDef = Object.keys(adminSubjectsList[0])
          if(columnDef.indexOf('Action') === -1) {
              columnDef.push('Action')
          }
          //Construct Row Data
          let userRowData = []
          adminSubjectsList.map((obj) => {
            obj.Action = <LinkDisp 
              kmLink="/km?p=admin_subjectsEdit" 
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

SubjectsList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SubjectsList)
