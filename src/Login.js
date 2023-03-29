import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from './config'

function Login() {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [regLoading, setregLoading] = useState(false)
    const navigate = useNavigate()
    const loginFormik = useFormik({
        initialValues: {
            UserName: '',
            Password: ''
        },
        validate: (values) => {
            let error = {}

            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.UserName)) {
                error.UserName = "Please Enter Valid Email"
            }
            if (!values.UserName) {
                error.UserName = "Please Enter UserName"
            }
            if (!values.Password) {
                error.Password = "Please Enter Password"
            }
            return error;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                setError()
                const { data } = await axios.post(`${config.api}/users/login`, values)
                console.log(data)
                setLoading(false)
                navigate(`${data}/dashboard`)

            } catch (error) {
                setLoading(false)
                setError(error.response.data)
                console.log(error)
            }
        }
    })
    const regFormik = useFormik({
        initialValues: {
            UserName: '',
            Password: '',
            confirm: ''
        },
        validate: (values) => {
            let error = {}

            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.UserName)) {
                error.UserName = "Please Enter Valid Email"
            }
            if (!values.UserName) {
                error.UserName = "Please Enter UserName"
            }
            if (!values.Password) {
                error.Password = "Please Enter Password"
            }
            if (!(values.Password === values.confirm)) {
                error.Password = " Password Mismatch"
            }
            return error;
        },
        onSubmit: async (values) => {
            try {
                setregLoading(true)
                delete values.confirm
                await axios.post(`${config.api}/users/reg`, values)
                setregLoading(false)
                alert('User Created Successfully')
                regFormik.resetForm()
            } catch (error) {
                setregLoading(false)
                console.log(error)
            }
        }
    })
    return (
        <div className='loginpage'>
            <div class="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div class="signup">
                    <form onSubmit={regFormik.handleSubmit}>
                        <label className='loginlabel' for="chk" aria-hidden="true" style={{ color: '#6d44b8' }}>Sign up</label>
                        <input className='logininput' type="email" name="UserName" value={regFormik.values.UserName} onChange={regFormik.handleChange} onBlur={regFormik.handleBlur} placeholder="Email" required="" style={{ height: '35px' }} />
                        {
                            regFormik.errors.UserName ? <span style={{ paddingLeft: "80px", color: "red" }} >
                                {regFormik.errors.UserName}
                            </span>
                                : ""
                        }
                        <input className='logininput' type="password" name="Password" value={regFormik.values.Password} onChange={regFormik.handleChange} onBlur={regFormik.handleBlur} placeholder="Password" required="" style={{ height: '35px' }} />
                        {
                            regFormik.errors.Password ? <span style={{ paddingLeft: "80px", color: "red" }}>
                                {regFormik.errors.Password}
                            </span>
                                : ""
                        }
                        <input className='logininput' type="password" name="confirm" value={regFormik.values.confirm} onChange={regFormik.handleChange} onBlur={regFormik.handleBlur} placeholder="Confirm Password" required="" style={{ height: '35px' }} />
                        {
                            regFormik.errors.confirm ? <span style={{ paddingLeft: "80px", color: "red" }}>
                                {regFormik.errors.confirm}
                            </span>
                                : ""
                        }
                        {
                            regLoading ? <button className='loginbutton' type='submit'> <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Loading...</button>
                                :
                                <button className='loginbutton' type='submit'>Sign Up</button>
                        }
                    </form>
                </div>

                <div class="login">
                    <form onSubmit={loginFormik.handleSubmit}>
                        <label className='loginlabel' for="chk" aria-hidden="true">Login</label>
                        <input className='logininput' type="email" name="UserName" value={loginFormik.values.UserName} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} placeholder="Email" required="" style={{ height: '35px' }} />
                        {
                            loginFormik.errors.UserName ? <span style={{ paddingLeft: "80px", color: "red" }} >
                                {loginFormik.errors.UserName}
                            </span>
                                : ""
                        }
                        <input className='logininput' type="password" name="Password" value={loginFormik.values.Password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} placeholder="Password" required="" style={{ height: '35px' }} />
                        {
                            loginFormik.errors.Password ? <span style={{ paddingLeft: "80px", color: "red" }}>
                                {loginFormik.errors.Password}
                            </span>
                                : ""
                        }
                        {
                            loading ? <button className='loginbutton' type='submit'> <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Loading...</button>
                                :
                                <button className='loginbutton' type='submit'>Login</button>
                        }
                        <button className='loginbutton' onClick={() => { loginFormik.setValues({ UserName: "abcd1234@gmail.com", Password: "12345678" }) }}>Gust User</button>
                        {
                            error ? <div style={{ paddingLeft: "100px", color: "red" }}>
                                {error}
                            </div>
                                : ""
                        }
                    </form>
                </div>
            </div>
        </div>

    )
}




export default Login