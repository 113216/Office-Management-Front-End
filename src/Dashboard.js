import React, { createContext, useEffect, useState } from 'react'
import Addemployee from './Addemployee'
import { config } from './config'
import Navbar from './Navbar'
import Table from './Table'
import axios from 'axios'
import Editemployee from './Editemployee'
import { Link, Outlet } from 'react-router-dom'

export const Context = createContext();

function Dashboard() {

    const [details, setDetails] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {

        async function fetchData() {
            try {
                setloading(true)
                const data = await axios.get(`${config.api}/employee/read`)
                setloading(false)
                setDetails(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const available = details.filter((detail) => { return detail.available == true })

    return (
        <Context.Provider value={details}>
            {
                loading ? <div class="d-flex justify-content-center" style={{ marginTop: "250px" }}>
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                    :
                    <div>
                        <Navbar />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <div class="question-dashboard">
                                        <div class="card mt-4 mb-3 mb-md-4">
                                            <div class="card-body p-3">
                                                <h5 class="text-secondary mb-2">Available: <span
                                                    class="font-weight-bold ml-1 text-dark">{available.length < 10 ? `0${available.length}` : available.length}</span></h5>
                                                <h5 class="text-secondary">Total: <span class="font-weight-bold ml-1 text-dark">{details.length < 10 ? `0${details.length}` : details.length}</span>
                                                </h5>

                                                <Link to={"/dashboard/create"} class="btn btn-primary mt-4" data-toggle="modal" data-target="#addEmployeeModal">
                                                    <i class="fa fa-plus"></i>&nbsp; Add Employee
                                                </Link>
                                                <Link to={"/dashboard/work"} class="btn btn-success mt-4" style={{ color: "white" }} data-toggle="modal" data-target="#workModal">
                                                    <i class="fa fa-eye"></i>&nbsp; View Work
                                                </Link>
                                            </div>
                                        </div>

                                        <Table />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Outlet />
                    </div>
            }

        </Context.Provider>
    )
}

export default Dashboard