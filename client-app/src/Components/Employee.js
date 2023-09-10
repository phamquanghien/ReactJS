import React, { Component } from 'react';
class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = { employees:[], loading: true }
    }
    componentDidMount(){
        this.populateEmployeeData();
    }
    static renderEmployeeTable(employees) {
        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>PersonID</th>
                    <th>Full name</th>
                    <th>Address</th>
                    <th>EmployeeID</th>
                    <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp =>
                        <tr key={emp.personID}>
                            <td>{emp.personID}</td>
                            <td>{emp.fullName}</td>
                            <td>{emp.address}</td>
                            <td>{emp.employeeId}</td>
                            <td>{emp.age}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    render() { 
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Employee.renderEmployeeTable(this.state.employees);
        return (
            <div>
                <h1>List Employee</h1>
                {contents}
            </div>
         );
    }
    async populateEmployeeData(){
        const response = await fetch('http://localhost:5209/api/Employee');
        const data = await response.json();
        this.setState({employees : data, loading : false});
    }
}
 
export default Employee;
