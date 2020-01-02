import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {connect} from 'react-redux';
import {createStream} from '../../actions'

class StreamCreate extends React.Component {

    //Destructing meta
    renderError = ({touched, error}) => {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
/*
    renderInput(formProps) {
        //return <input onChange={formProps.input.onChange} value={formProps.input.value} />  
        return <input {...formProps.input} />
    }
    */
   //Destructing formProps
   renderInput = ({input, label, meta}) => {
       const cname=`field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={cname}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }

    onSubmit = (formValues) =>  {
        this.props.createStream(formValues);
    }

    render() {
        
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" type="text" component={this.renderInput} label="Title"/>
                <Field name="description" type="text"  component={this.renderInput} label="Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        ) 
    }
}


const validate = (formValues) => {
    const errors = {}
    if (!formValues.title) {
        errors.title = "Title is a required field"
    }
    if (!formValues.description) {
        errors.description = "Description is a required field"
    }
    return errors;
}

const formWrapped =  reduxForm({
    form: 'streamCreate ',
    validate: validate,
})(StreamCreate);

export default connect(null,{createStream})(formWrapped);