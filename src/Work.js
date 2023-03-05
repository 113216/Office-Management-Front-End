import React, { useContext } from 'react'
import { Context } from './Dashboard'

function Work() {

    const value = useContext(Context)
    const res = value.filter((obj) => obj.available === false)
    return (
        <div class="modal fade" id="workModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Task</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    res.length === 0 ? <tr>
                                        <td></td>
                                        <td>No Work Assigned</td>
                                        <td></td>
                                    </tr>

                                        :
                                        res.map((item) => {
                                            return <tr>
                                                <td>{item.name}</td>
                                                <td>{item.department}</td>
                                                <td>{item.task}</td>
                                            </tr>
                                        })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Work