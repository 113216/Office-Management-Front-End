import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { config } from './config';
import { useParams } from 'react-router-dom';
import { Context } from './Dashboard';

function Editemployee() {

    const [loading, setloading] = useState(false)
    const [id, setId] = useState([])

    const params = useParams();

    const values = useContext(Context)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const result = values.filter((value) => { return value._id == params.id });
                setId(result[0]._id)
                formik.setValues(result[0]);

            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [params.id])

    const formik = useFormik({

        initialValues: {
            name: "",
            gender: "",
            age: "",
            designation: "",
            department: "",
            date: ""
        },
        validate: (values) => {

            let error = {};

            if (!values.name) {
                error.name = "Please enter a name";
            }
            if (values.name && (values.name.length < 3 || values.name.length > 15)) {
                error.name = "Name must be between 3 to 15 characters";
            }
            if (parseInt(values.age) <= 18) {
                error.age = "Age must be above 18";
            }
            if (values.gender == "Select gender...") {
                error.gender = "Please select a gender"
            }
            if (values.department == "Select a Department") {
                error.department = "Please select a Department"
            }

            return error
        },
        onSubmit: async (values) => {

            try {
                setloading(true)
                const data = await axios.put(`${config.api}/employee/update/${id}`, values)
                console.log(data)
                setloading(false)
                alert("Employee Updated Succesfully")
                window.location.href = `${params.token}/dashboard`
                formik.resetForm()
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <div class="modal fade" id="editEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="addEmployeeModal"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header pt-3 pb-2">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Edit Employee</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div style={{ color: "red" }} className='p-2'>* All Fields are Mandatory</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="form-row ">
                                <div class="form-group col-md-6">
                                    <label class="mb-1">Name</label>
                                    <input
                                        type="text"
                                        name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`form-control ${formik.errors.name ? 'error-box' : ''} 
                        				${formik.touched.name && !formik.errors.name ? 'success-box' : ''}`} id="" placeholder="Enter Name..." />
                                    {
                                        formik.errors.name ? <span style={{ color: "red" }}>{formik.errors.name}</span> : null
                                    }
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="mb-1">Gender</label>
                                    <select
                                        name='gender'
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`form-control ${formik.errors.gender ? 'error-box' : ''} 
                        ${formik.touched.gender && !formik.errors.gender ? 'success-box' : ''}`}
                                        id="exampleFormControlSelect1">
                                        <option>Select gender...</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                    {
                                        formik.errors.gender ? <span style={{ color: "red" }}>{formik.errors.gender}</span> : null
                                    }
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="mb-1">Age</label>
                                    <input
                                        name='age'
                                        value={formik.values.age}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="number"
                                        className={`form-control ${formik.errors.age ? 'error-box' : ''} 
                        ${formik.touched.age && !formik.errors.age ? 'success-box' : ''}`}
                                        id="" placeholder="Enter your age..." />
                                    {
                                        formik.errors.age ? <span style={{ color: "red" }}>{formik.errors.age}</span> : null
                                    }
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="mb-1">Designation</label>
                                    <input type="text"
                                        name='designation'
                                        value={formik.values.designation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        class="form-control" id="" placeholder="Enter Designation" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="mb-1">Department</label>
                                    <select type="text"
                                        name='department'
                                        value={formik.values.department}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`form-control ${formik.errors.department ? 'error-box' : ''} 
                        ${formik.touched.department && !formik.errors.department ? 'success-box' : ''}`}
                                        id="" placeholder="Select a Department... ">
                                        <option>Select a Department</option>
                                        <option>Frontend Development</option>
                                        <option>Backend Development</option>
                                        <option>Testing</option>
                                        <option> Deployment</option>
                                    </select>
                                    {
                                        formik.errors.department ? <span style={{ color: "red" }}>{formik.errors.department}</span> : null
                                    }
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="mb-1">Joining Date</label>
                                    <input type="date"
                                        name='date'
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        class="form-control" id="" placeholder="Select a date..." />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger " data-dismiss="modal">Cancel</button>
                                {
                                    loading ? <button class="btn btn-success" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                        Updating...
                                    </button>
                                        :
                                        <input type="submit" class="btn btn-success " value={"Update"} />
                                }
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Editemployee