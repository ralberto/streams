import React from 'react';
import {connect} from 'react-redux'
import {CLIENT_ID, SCOPES} from '../constants/auth'
import {signIn, signOut} from '../actions'


class GooleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: CLIENT_ID,
                scope: SCOPES
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                const userId = this.auth.currentUser.get().getId()
                if(this.auth.isSignedIn.get()) {
                    this.props.signIn(userId)
                } else {
                    this.props.signOut()
                }
            }, (err) => {
                console.log("Sorry. You need to allow third party cookies!")
                console.log(err)
            });
        });
    }


    signIn = () => {
        this.auth.signIn().then(this.props.signIn(this.auth.currentUser.get().getId()))
    }

    signOut = () => {
        this.auth.signOut().then(this.props.signOut())
    }
    

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return <div>I dont' know if we're signed in!</div>
        } else if(this.props.isSignedIn) {
            return (<div>
                <button className="ui red google button" onClick={this.signOut}>
                <i className="google icon"></i> Sign Out</button>
            </div>)
        } else {
            return (<div>
                <button className="ui blue google button" onClick={this.signIn}>
                    <i className="google icon"/> Sign In With Google
                </button>
            </div>)
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {signIn, signOut})(GooleAuth);   