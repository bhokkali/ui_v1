import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import SimpleTable from '../Common/Table/SimpelTable'
import LinkDisp from '../Common/LinkDisp'
import PaginatedTable from '../Common/Table/PaginatedTable'
import { isEmpty } from '../Common/Utility/Utils'

const styles = {
    root: {
      display: 'flex',
      height: 300,
    },
    paper: {
      margin: '10px 0px',
      padding: '10px',
    }
  };
  
  
  export class ListParents extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: []
      }
    }

    componentDidMount() {
      this.props.getSchoolParents(this.props.authInfo.id, 0, 10)
    }

    pagination = (page, limit) => {
      this.props.getSchoolParents(this.props.authInfo.id, page, limit)
    }
    
    static getDerivedStateFromProps(props, state) {
      const { listSchoolParents } = props
      if (!isEmpty(listSchoolParents) && listSchoolParents.parentsList.length > 0) {
        // Construct column data
        let columnDef = Object.keys(listSchoolParents.parentsList[0])
        columnDef = _.remove(columnDef, function(n) {
          return (n !== 'id' && n !== 'school_id' && n !== 'releving_date' && n !== 'login_name' && n !== 'login_pwd');
        });
        if(columnDef.indexOf('Action') === -1) {
            columnDef.push('Action')
        } 
        //Construct Row Data
        let userRowData = []
        listSchoolParents.parentsList.map((obj) => {
          obj.Action = <div><LinkDisp 
            kmLink="/km?p=parents_edit" 
            kmLinkId={obj.id}
            kmLinkName="Edit" 
        /> | <LinkDisp 
        kmLink="/km?p=students_add" 
        kmLinkId={obj.id}
        kmLinkName="Add-Student" 
    /></div>
          userRowData.push(obj)
        })

        return {
            columnDef,
            userRowData
        }

      }
    }
  
    render() {
      const { classes, listSchoolParents } = this.props
      const { columnDef, userRowData } = this.state
      let count = !isEmpty(listSchoolParents) ? listSchoolParents.count : 0
      return (
        <div id="mainContainer">
          <PaginatedTable 
            columnDef={columnDef} 
            rows={userRowData}
            paginationCB={this.pagination}
            count={count}
            label="List Parents"
          />
        </div>)
    }
  }
  
  

export default withStyles(styles)(ListParents)