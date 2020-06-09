import React from 'react'
import Dashbord from '../components/Dashboard/Dashboard'

export class DashboardContainer extends React.Component {

    render() {
        const { authInfo, subadminInfo } = this.props
        return (
            <React.Fragment>
                <Dashbord authInfo={authInfo.data} subadminInfo={subadminInfo} />
            </React.Fragment>
        )
    }
}

export default DashboardContainer;