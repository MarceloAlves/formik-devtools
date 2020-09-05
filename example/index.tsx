import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FormikDevTool } from '../src/index'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email(),
  address: Yup.string(),
  country: Yup.string(),
  state: Yup.string(),
  phone: Yup.string(),
  age: Yup.number()
    .min(1)
    .max(110)
})

const App = () => {
  return (
    <div>
      <p>hi</p>
      <Formik
        onSubmit={console.log}
        initialValues={{ name: '', email: '', address: '', country: '', state: '', phone: '', age: '' }}
        validationSchema={schema}
      >
        {() => (
          <Form>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Name</label>
              <Field type='text' name='name' />
              <ErrorMessage name='name' />
              <label>Email</label>
              <Field type='email' name='email' />
              <ErrorMessage name='email' />
              <label>Address</label>
              <Field type='text' name='address' />
              <ErrorMessage name='address' />
              <label>Country</label>
              <Field type='text' name='country' />
              <ErrorMessage name='country' />
              <label>State</label>
              <Field type='text' name='state' />
              <ErrorMessage name='state' />
              <label>Phone</label>
              <Field type='text' name='phone' />
              <ErrorMessage name='phone' />
              <label>Age</label>
              <Field type='number' name='age' />
              <ErrorMessage name='age' />
            </div>
            <button type='submit'>Submit</button>
            <FormikDevTool />
          </Form>
        )}
      </Formik>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
