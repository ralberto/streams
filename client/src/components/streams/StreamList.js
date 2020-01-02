import React from 'react';
import {connect} from 'react-redux';

import {fetchStreams} from '../../actions'

class StreamList extends React.Component {


    componentDidMount() {
        this.props.fetchStreams()
    }

    renderList = () => {
        return this.props.streams.map((stream) => {
            console.log(stream)
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle  aligned icon camera"></i>
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )}
        )
    }

    render() {

        return (
            <div>
                <h1>Streams</h1>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //Converting Object to Array
        streams: Object.values(state.streams)
    }
    
}

export default connect(mapStateToProps, {fetchStreams})(StreamList); 