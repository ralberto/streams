import React from 'react';

import { connect } from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) =>  {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if(!this.props.stream)  {
            return <div>Loading...</div>
        } else {
            //initial values contains an hash with {name: ... , description: ... }
            //values from this keys will be used on the StreamForm/Field component with the
            //same "name" attribute.
            const {title, description} = this.props.stream;
            return (
                //initialValues={this.props.stream} - Will pass all the stream props, including 
                //userId and stream ID... depending on the server setup it might consideder that
                //we also want to update the userId and streamId

                //So we must pass only the name and descriptiom
                //Option 1 - {name: this.props.stream.name, description: this.props.stream.description }
                //Option 2 -
                <StreamForm onSubmit={this.onSubmit} initialValues={{title, description}}/>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit); 