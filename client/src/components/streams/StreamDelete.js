import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {connect} from 'react-redux';
import {deleteStream, fetchStream} from '../../actions'
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component {
    // <> -> Same as <React.Fragment>

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions() {
        //const id = this.props.match.params.id
        const {id} = this.props.match.params
        return (
            <React.Fragment> 
                <button 
                    className="ui negative button"
                    onClick={() => this.props.deleteStream(id)}
                    >Delete</button>
                <Link to="/" className="ui button primary">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if(this.props.stream) {
            return `Are you sure you want to delete the stream? ${this.props.stream.title}`
        } 

        return 'Are you sure you want to delete the stream?'
        
    }

    render() {
        const title = this.props.stream ?  this.props.stream.title : ''
        return (
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push("/")}/>

        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {deleteStream,fetchStream})(StreamDelete); 