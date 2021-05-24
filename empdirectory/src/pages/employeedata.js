import React from "react";
import axios from "axios";

class EmployeeData extends React.Component {
    state = {
        employeeDetails: [],
        empDataBase:[],
        sortOrder: "asc",
        searchString: ""
    }

    componentDidMount = () => {
        axios.get("https://randomuser.me/api/?results=200&nat=us")
            .then(records => {
                console.log("Records", records)
                let empData = []
                let apiData = records.data.results
                for (let i = 0; i < apiData.length; i++) {
                    empData.push({
                        firstname: apiData[i].name.first,
                        lastname: apiData[i].name.last,
                        email: apiData[i].email,
                        img: apiData[i].picture.medium,
                        phone: apiData[i].phone,
                        nat: apiData[i].nat,
                        gender: apiData[i].gender


                    })
                }
                this.setState({
                    employeeDetails: empData,
                    empDataBase : empData
                })
            })

    }
    sortLastName = () => {
        if (this.state.sortOrder === "asc") {
            let empData = this.state.employeeDetails;
            for (let i = 0; i < empData.length; i++) {
                for (let j = 0; j < empData.length; j++) {
                    if (empData[i].lastname < empData[j].lastname) {
                        let temp = empData[i];
                        empData[i] = empData[j]
                        empData[j] = temp

                    }
                }
            }
            this.setState({ employeeDetails: empData, sortOrder: "desc" })
            console.log(empData)
        } else {
            let empData = this.state.employeeDetails;
            for (let i = 0; i < empData.length; i++) {
                for (let j = 0; j < empData.length; j++) {
                    if (empData[i].lastname > empData[j].lastname) {
                        let temp = empData[i];
                        empData[i] = empData[j]
                        empData[j] = temp

                    }
                }
            }
            this.setState({ employeeDetails: empData, sortOrder: "asc" })
            console.log(empData)
        }

    }
    getfirstname = (event) => {
        let ele = event.target.value;
        this.setState({ searchString: ele }, () =>
            console.log(ele))
    }

    grabfirstname = (event) => {
        event.preventDefault()
        let emprecords = this.state.employeeDetails;
        let filterrecords = []
    for (let i = 0; i < emprecords.length; i++) {
            if (emprecords[i].firstname.toLocaleLowerCase().indexOf(this.state.searchString.toLocaleLowerCase()) > -1) {
                filterrecords.push(emprecords[i])
            }
        }
        console.log(filterrecords)
        this.setState({
            employeeDetails:filterrecords
        })
    }
getEmployeelist= (event) => {
    event.preventDefault()
    let empData = this.state.empDataBase
    this.setState ({ employeeDetails: empData})

}



    render() {
        return (<main className="container">
            <h1> IT Department</h1>
            {/* {this.state.employeeDetails.map((item,key) => (
                    <div className="card" key={key}>
                        <h6>{item.first}{item.last}</h6>
                        <p>{item.email}</p>
                    </div>
                ))} */}
            <form>
                <div className="col-md-2">
                    <label className="form-label">Enter employee's first name</label>
                    <input type="text" value={this.state.searchString} onChange={this.getfirstname} className="form-control" />
                </div>
                <div className="col-12">
                    <button type="submit" onClick={this.grabfirstname} className="btn btn-primary">Search employee by first name</button>
                </div>

                <div className="col-12">
                    <button type="reset" onClick={this.getEmployeelist} className="btn btn-primary">Reset</button>
                </div>

            </form>
            <table className="container-fluid table table-striped">
                <thead>
                    <tr>
                        <th>Bio pic</th>
                        <th>First Name</th>
                        <th><button className="btn btn-primary" onClick={this.sortLastName}>Last Name</button></th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Nationality</th>
                        <th>Gender</th>


                    </tr>
                </thead>
                <tbody>
                    {this.state.employeeDetails.map((item, key) => {
                        return (<tr key={key}>
                            <td><img src={item.img} alt="bio pics" /></td>
                            <td>{item.firstname}</td>
                            <td> {item.lastname}</td>
                            <td> {item.email}</td>
                            <td> {item.phone}</td>
                            <td> {item.nat}</td>
                            <td> {item.gender}</td>



                        </tr>)
                    })}
                </tbody>
            </table>
        </main>
        )
    }

}


export default EmployeeData