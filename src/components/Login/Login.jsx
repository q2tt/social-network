import React from "react";
import {Formik, Field, Form } from "formik";
import * as yup from 'yup';
import c from './Login.module.css';
import {connect} from 'react-redux';
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";


const Login = (props) => {
    const validationsSchema = yup.object().shape({
        email: yup.string().typeError('la-la').required('обязательно'),
        password: yup.string().typeError('la-la').required('обязательно'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('обязательно')
    })


        if(props.isAuth) return <Navigate to="/Profile" />
        console.log(props)
    console.log(props.isAuth)

    return (
       <div className={c.container}>
           <h1 className={c.title}>Login</h1>


           <Formik
               initialValues={ {
                   email: '',
                   password: '',
                   rememberMe: false
               }}

               let onSubmit = {(values, onSubmitProps) => {
                props.login(values.email, values.password, values.rememberMe, onSubmitProps.setStatus, onSubmitProps.setSubmitting);
                onSubmitProps.setSubmitting(true);
            }}

               validationSchema= {validationsSchema}
           >
               {({ values, errors, touched,
                     handleChange, handleBlur, isValid,handleSubmit, dirty, isSubmitting, status }) => (
                   <Form>
                         <div>
                             <div className={'login'}>
                                 <Field placeholder={'email'} className={c.input} type={'text'} name={'email'} onChange={handleChange} onBlur={handleBlur} value={values.email} />
                             </div>
                           {touched.email && errors.email&& <p className={c.validationStatus}>{errors.email}</p>}
                           <Field  placeholder={'password'} className={c.input} type={'password'} name={'password'} onChange={handleChange} onBlur={handleBlur} value={values.password} />
                             {touched.password && errors.password&& <p className={c.validationStatus}>{errors.password}</p>}
                             <input placeholder={'password'} className={c.input} type={'password'} name={'confirmPassword'} onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} />
                             {touched.confirmPassword&& errors.confirmPassword && <p className={c.validationStatus}>{errors.confirmPassword}</p>}

                             <label className={c.checkbox}> Запомнить меня
                                <Field type={'checkbox'} name={'rememberMe'}/>
                             </label>

                             {props.captchaUrl && <img src={props.captchaUrl} />}

                             <button className={c.btnLogin} type="submit" disabled={!isValid && !dirty && Formik.isSubmitting}>Login</button>
                             {status && status.message && (
                                 <div className="message">{status.message}</div>
                             )}

                    </div>
                       </Form>
                       ) }
           </Formik>
       </div>
    )
}

let mapStateToProps = (state) => {
    return{
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
        state: state

    }
}

export default connect(mapStateToProps, {login}) (Login);