import React, { Component } from 'react';
import { Form, Header, Grid, Segment, Button } from 'semantic-ui-react';
import { Formik } from 'formik';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: ''
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleSubmit(value) {
    console.log(value);
  }

  validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.username) {
      errors.username = 'Required';
    }

    console.log(errors);

    return errors;
  }

  render() {
    return (
      <div className='signup-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.signup-form {
            height: 100%;
          }
        `}</style>
        <Grid centered style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 900 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Sign Up
            </Header>
            <Segment>
              <Formik
                initialValue={INITIAL_STATE}
                validate={this.validate}
                onSubmit={this.handleSubmit}
                render={({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Field>
                        <label>Username</label>
                        <Form.Input
                          type="text"
                          name="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          error={errors.username && touched.username}
                        />
                        {errors.username && touched.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                      </Form.Field>
                      <Form.Field>
                        <label>Email Address</label>
                        <Form.Input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          error={errors.email && touched.email}
                        />
                        {errors.email && touched.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                      </Form.Field>
                      <Button type="submit" color='teal' fluid size='large' disabled={isSubmitting}>
                        Sign Up
                      </Button>
                    </Form>
                  )}
              />
            </Segment>
          </Grid.Column>
        </Grid>


        {/* <Grid centered style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 900 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Sign Up
            </Header>
            <Segment>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>Username</label>
                  <input
                    value={this.state.username}
                    name="username"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="User Name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email Address</label>
                  <input
                    value={this.state.email}
                    name="email"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Email Address"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    value={this.state.passwordOne}
                    name="passwordOne"
                    onChange={this.handleInputChange}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Confirm Password</label>
                  <input
                    value={this.state.passwordTwo}
                    name="passwordTwo"
                    onChange={this.handleInputChange}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Field>
                <Button color='teal' fluid size='large'>
                  Sign Up
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid> */}
      </div>
    );
  }
}

export default SignUp;