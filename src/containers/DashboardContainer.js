import React from 'react'
import Dashbord from '../components/Dashboard/Dashboard'

export class DashboardContainer extends React.Component {

    render() {
        const { authInfo } = this.props
        return (
            <React.Fragment>
                <Dashbord authInfo={authInfo.data} />
            </React.Fragment>
        )
    }
}

export default DashboardContainer;