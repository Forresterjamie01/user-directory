import React from "react";
import axios from "axios";

class EmployeeData extends  React.Component{
    state= {
        employeeDetails : [],
        sortOrder : "asc"
    }

    componentDidMount = () => {
        axios.get("https://randomuser.me/api/?results=20&nat=us")
        .then( records => {
            console.log("Records",records)
            let empData = []
            let apiData = records.data.results
            for(let i=0;i<apiData.length;i ++){
                empData.push({
                    firstname: apiData[i].name.first,
                    lastname: apiData[i].name.last,
                    email: apiData[i].email,
                    img : apiData[i].picture.medium
                    
                })
            }
            this.setState({
                employeeDetails:empData
            })
        })

    }
    sortLastName = () => {
        if(this.state.sortOrder === "asc"){
        let empData = this.state.employeeDetails;
         for(let i =0;i<empData.length;i++){
             for(let j=0;j<empData.length;j++){
                 if ( empData[i].lastname< empData[j].lastname){
                     let temp = empData[i];
                     empData[i] = empData[j]
                     empData[j] = temp

                 }
             }
         }
         this.setState({employeeDetails:empData,sortOrder:"desc"})
        console.log(empData)
        }else{
            let empData = this.state.employeeDetails;
            for(let i =0;i<empData.length;i++){
                for(let j=0;j<empData.length;j++){
                    if ( empData[i].lastname > empData[j].lastname){
                        let temp = empData[i];
                        empData[i] = empData[j]
                        empData[j] = temp
   
                    }
                }
            }
            this.setState({employeeDetails:empData,sortOrder:"asc"})
           console.log(empData)    
        }

    }
        render(){
            return(<main className="container">
                <h1>Here is the Employee Data:</h1>
                {/* {this.state.employeeDetails.map((item,key) => (
                    <div className="card" key={key}>
                        <h6>{item.first}{item.last}</h6>
                        <p>{item.email}</p>
                    </div>
                ))} */}
                <table className= "table-table-striped">
                    <thead>
                        <tr>
                            <th>Bio pic</th>
                            <th>First Name</th>
                            <th><button onClick={this.sortLastName}>Last Name</button></th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employeeDetails.map( (item,key) =>{
                            return(<tr key={key}>
                                <td><img src={item.img}/></td>
                                <td>{item.firstname}</td> 
                                <td> {item.lastname}</td>
                                <td> {item.email}</td>

                            </tr>)
                        })}
                    </tbody>
                </table>
            </main>
            )
        }
    
}


export default EmployeeData