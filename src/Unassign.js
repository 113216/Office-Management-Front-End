import React, { useContext, useState } from 'react'
import { config } from './config'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Context } from './Dashboard'

function Unassign() {
    const params = useParams()
    const value = useContext(Context)
    var res = value.filter(obj => obj._id === params.id)
    const [loading, Setloading] = useState(false)
    async function Unassign(id) {

        try {
            Setloading(true)
            var value = { available: true }
            await axios.put(`${config.api}/employee/assign/${id}`, value)
            Setloading(false)
            alert("Work Unassigned")
            window.location.href = `/${params.token}/dashboard`
        } catch (error) {
            Setloading(false)
            console.log(error)
        }
    }

    return (
        <div><div class="modal fade" id="UnassignModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="container">
                        <input type="text" id="disabledTextInput" class="form-control mt-4" placeholder={res[0].name} />
                        <input type="text" id="disabledTextInput" class="form-control mt-4" placeholder={res[0].department} />
                        <input type="text" id="disabledTextInput" class="form-control mt-4" placeholder={res[0].task} />
                    </div>

                    <div class="modal-body">
                        Are you sure ?
                    </div>
                    <div class="modal-footer">
                        {
                            loading ? <button class="btn btn-danger" type="button" disabled>
                                <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                UnAssinging...
                            </button>
                                :
                                <button type="button" class="btn btn-danger" onClick={() => { Unassign(params.id) }}>UnAssign</button>
                        }
                        <button type="button" class="btn btn-primary">Cancel</button>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default Unassign