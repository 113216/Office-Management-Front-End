import React, { useContext, useEffect, useState } from 'react'

import { Context } from './Dashboard';
import { Link, useParams } from 'react-router-dom';

function Table() {
    const PerPage = 3;
    const values = useContext(Context);
    const params = useParams()
    useEffect(() => {
        pagenate(0)
    }, [values]);

    function Search() {
        var input = document.getElementById("search").value;
        var result = values.filter((value) => {
            if (value.name.includes(input)) {
                return value
            }
        })
        console.log(input)
        if (!input) {
            pagenate(0)
        } else {
            setTablelist(result)
        }
    }



    const [TableList, setTablelist] = useState([])
    const [currentPage, setcurrentPage] = useState(0)


    let pagenate = (index) => {
        let startValue = PerPage * index;
        let endValue = startValue + PerPage;
        let list = result.slice(startValue, endValue)
        setTablelist(list)
        setcurrentPage(index)
    }

    let prev = () => {
        if (currentPage !== 0)
            pagenate(currentPage - 1)
    }

    let next = () => {
        if (currentPage !== (values.length / PerPage) - 1)
            pagenate(currentPage + 1)
    }

    //Sorting data
    const result = values.sort(function (x, y) { return y.available - x.available })

    return (
        <div class="table-responsive mt-3 mt-md-4 mb-2">
            <div class="container-fluid mb-4" style={{ paddingLeft: "450px" }}>
                <form class="d-flex" role="search">
                    <input style={{ width: "300px" }} class="form-control me-2" id='search' type="search" placeholder="Search by employee name..." onKeyUp={Search} aria-label="Search" />
                </form>
            </div>
            <table class="table table-bordered" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Available</th>
                        <th>View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        TableList.map((value, index) => {
                            return <tr key={index}>
                                <td>{value.name}</td>
                                <td>{value.department}</td>
                                <td>
                                    <div class="custom-control custom-checkbox">
                                        {
                                            value.available == true ?
                                                <Link to={`/${params.token}/dashboard/assign/${value._id}`} type='button' className='btn btn-outline-success btn-sm' data-toggle="modal" data-target="#assignEmployeeModal" >Assign Work</Link>
                                                :
                                                <Link to={`/${params.token}/dashboard/unassign/${value._id}`} type='button' className='btn btn-outline-warning btn-sm' data-toggle="modal" data-target="#UnassignModal" >UnAssign Work</Link>
                                        }
                                    </div>
                                </td>
                                <td>
                                    <Link to={`/${params.token}/dashboard/edit/${value._id}`} type="button" class="btn btn-outline-info btn-sm mr-2" data-toggle="modal" data-target="#editEmployeeModal">
                                        <i class="fa fa-edit"></i> Edit
                                    </Link>
                                    <Link to={`/${params.token}/dashboard/delete/${value._id}`} type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#deleteEmployeeModal">
                                        <i class="fa fa-trash"></i> Delete
                                    </Link>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

            <div id='paginate'>
                <nav aria-label="Page navigation example">
                    <ul class="pagination" style={{ marginLeft: "250px", marginTop: "50px" }}>
                        {
                            <button class={`btn btn-outline-secondary ${currentPage !== 0 ? "active" : "disabled"} mr-1`} onClick={prev}>Previous</button>
                        }
                        {
                            [...Array(Math.ceil(values.length / PerPage))].map((page, index) => {
                                return <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <button className={`btn btn-outline-primary mr-1 ${currentPage == index ? "active" : " "}`} onClick={() => pagenate(index)}>{index + 1}</button>
                                        </li>
                                    </ul>
                                </nav>
                            })
                        }
                        {
                            // currentPage !== (Math.ceil(values.length / PerPage)) - 1 ? <button class="page-link" onClick={next}>Next</button> : null
                            <button class={`btn btn-outline-secondary ml-1 ${currentPage !== (Math.ceil(values.length / PerPage)) - 1 ? "active" : "disabled"}`} onClick={next}>Next</button>
                        }
                    </ul>
                </nav>
            </div>
        </div>

    )
}

export default Table