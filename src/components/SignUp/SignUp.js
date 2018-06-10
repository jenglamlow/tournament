import React, { Component } from 'react';
import { Form, Header, Grid, Segment, Button, Message } from 'semantic-ui-react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import { auth, db } from '../../firebase';
import { signup } from '../../redux/modules/user';

const INITIAL_STATE = {
  username: 'jeng',
  email: 'jenglamlow@gmail.com',
  password: '12345678'
};

const SCHEMA = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, form) {

    db.checkUsername('jeng').then(a => {
      console.log(a);
    });

    // auth.doCreateUserWithEmailAndPassword(values.email, values.password)
    //   .then(user => {
    //     // Create a user in database
    //     db.doCreateUser(user.user.uid, values.username, values.email)
    //     .then(() => {
    //       console.log('ok');
    //     })
    //     .catch(error => {
    //       form.setErrors({
    //         signup: error.message
    //       });
    //     });
    //   })
    //   .catch(error => {
    //     form.setErrors({
    //       signup: error.message
    //     });
    //   });
  }

  render() {
    return (
      <Formik
        initialValues={ INITIAL_STATE }
        validationSchema={ SCHEMA }
        onSubmit={ this.handleSubmit }
        render={ ({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
            <div className='signup-form'>
              <style>{`
                body > div,
                body > div > div,
                body > div > div > div.signup-form {
                  height: 100%;
                }
              `}</style>
              <Grid centered style={ { height: '100%' } } verticalAlign='middle'>
                <Grid.Column style={ { maxWidth: 900 } }>
                  { errors.signup && ( 
                    <Message
                      error
                      header='Sign Up Error'
                      content={ errors.signup }
                    />
                  )}
                  <Header as='h2' color='teal' textAlign='center'>
                    Sign Up
                  </Header>
                  <Segment>
                    <Form onSubmit={ handleSubmit }>
                      <Form.Field>
                        <label>Username</label>
                        <Form.Input
                          type="text"
                          name="username"
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.username }
                          error={ errors.username && touched.username }
                        />
                        {errors.username && touched.username && <div style={ { color: 'red' } }>{errors.username}</div>}
                      </Form.Field>
                      <Form.Field>
                        <label>Email Address</label>
                        <Form.Input
                          type="email"
                          name="email"
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.email }
                          error={ errors.email && touched.email }
                        />
                        {errors.email && touched.email && <div style={ { color: 'red' } }>{errors.email}</div>}
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <Form.Input
                          type="password"
                          name="password"
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.password }
                          error={ errors.password && touched.password }
                        />
                        {errors.password && touched.password && <div style={ { color: 'red' } }>{errors.password}</div>}
                      </Form.Field>
                      <Button type="submit" color='teal' fluid size='large' disabled={ isSubmitting }>
                        Sign Up
                      </Button>
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid>
            </div>
          ) }
      />
    );
  }
}

SignUp.propTypes = {
  // isPinging: PropTypes.bool,
  // ping: PropTypes.func
};

const mapStateToProps = state => ({
  // isPinging: state.ping.isPinging,
});


export default connect(mapStateToProps, { signup })(SignUp);