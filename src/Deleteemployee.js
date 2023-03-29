import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { config } from './config';
import { Context } from './Dashboard'
import axios from 'axios'

function Deleteemployee() {

    const [id, setId] = useState([])

    const params = useParams();
    const navigate = useNavigate()

    const values = useContext(Context)

    const [loading, setloading] = useState(false)

    async function deleteEmployee(id) {

        try {
            setloading(true)
            await axios.delete(`/${config.api}/employee/delete/${id}`)
            setloading(false)
            window.location.href = `${params.token}/dashboard`
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const result = values.filter((value) => { return value._id == params.id });
                setId(result[0]);

            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [params.id])

    return (
        <div class="modal fade" id="deleteEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="deleteEmployeeModal"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header pt-3 pb-2">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Delete Employee</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className='container'>
                            <div class="card">
                                <div class="card-body">
                                    <div><b>NAME :</b> {id.name}</div>
                                    <div><b>AGE :</b> {id.age}</div>
                                    <div><b>GENDER :</b> {id.gender}</div>
                                    <div><b>DESIGNATION :</b> {id.designation}</div>
                                    <div><b>DEPARTMENT :</b> {id.department}</div>
                                    <div><b>DATE OF JOINING :</b> {id.date}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div style={{ color: "red" }}>Are you sure...You want to delete the employee!!</div>
                        <button type="button" class="btn btn-success btn-sm" data-dismiss="modal">Cancel</button>
                        {
                            loading ? <button class="btn btn-delete btn-sm" type="button" disabled>
                                <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Deleting...
                            </button>
                                :
                                <button type="button" onClick={() => { deleteEmployee(id._id) }} class="btn btn-danger btn-sm">Delete</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deleteemployee