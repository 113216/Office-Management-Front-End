import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { config } from './config'
import { Context } from './Dashboard'

function Assign() {

    const params = useParams()
    const value = useContext(Context)
    console.log(value)
    const [emp, setEmp] = useState([])
    const [loading, setLoading] = useState(false)

    var res = value.filter(obj => obj._id === params.id)

    const formik = useFormik({
        initialValues: {
            task: ''
        },
        validate: (values) => {
            let error = {}
            if (!values.task) {
                error.task = "Please Enter Task..."
            }
            return error
        }, onSubmit: async (values) => {
            try {
                setLoading(true)
                values.available = false
                console.log(values)
                await axios.put(`${config.api}/employee/assign/${params.id}`, values)
                setLoading(false)
                alert("Work Assigned")
                window.location.href = `/${params.token}/dashboard`
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }


    })
    return (

        <div class="modal fade" id="assignEmployeeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form onSubmit={formik.handleSubmit}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input type="text" readonly class="form-control-plaintext" value={res[0].name} />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Department</label>
                                <div class="col-sm-10">
                                    <input type="text" readonly class="form-control-plaintext ml-3" value={res[0].department} />
                                </div>
                            </div>
                            <textarea className='form-control' name='task' value={formik.values.task} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
                            {
                                formik.errors.task ? <span style={{ color: 'red' }}>{formik.errors.task}</span> : ''
                            }
                        </div>
                        <div class="modal-footer">
                            {
                                loading ? <button class="btn btn-primary" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                    Assinging...
                                </button>

                                    :
                                    <button type="submit" class="btn btn-primary">Assign</button>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Assign