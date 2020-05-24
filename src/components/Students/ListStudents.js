import React from 'react'
import _ from 'lodash'
import PaginatedTable from '../Common/Table/PaginatedTable'
import LinkDisp from '../Common/LinkDisp'
import { isEmpty } from '../Common/Utility/Utils'
  
  
  export class ListStudents extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        columnDef: [],
        userRowData: []
      }
    }

    componentDidMount() {
      this.props.getSchoolStudents(this.props.authInfo.id, 0, 10)
    }

    pagination = (page, limit) => {
      this.props.getSchoolStudents(this.props.authInfo.id, page, limit)
    }
    
    static getDerivedStateFromProps(props, state) {
      const { listSchoolStudents } = props
      if (!isEmpty(listSchoolStudents) && listSchoolStudents.studentsList.length > 0) {
        // Construct column data
        let columnDef = Object.keys(listSchoolStudents.studentsList[0])
        columnDef = _.remove(columnDef, function(n) {
          return (n !== 'id' && n !== 'school_id' && n !== 'parents_id' && n !== 'key');
        });
        if(columnDef.indexOf('Action') === -1) {
            columnDef.push('Action')
        } 
        //Construct Row Data
        let userRowData = []
        listSchoolStudents.studentsList.map((obj) => {
          obj.Action = <LinkDisp 
            kmLink="/km?p=students_edit" 
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
  
    render() {
      const { listSchoolStudents } = this.props
      const { columnDef, userRowData } = this.state
      let count = !isEmpty(listSchoolStudents) ? listSchoolStudents.count : 0
      return (
        <div id="mainContainer">
          <PaginatedTable 
            columnDef={columnDef} 
            rows={userRowData}
            paginationCB={this.pagination}
            count={count}
            label="List All Parents"
          />
        </div>)
    }
  }
  
  

export default ListStudents