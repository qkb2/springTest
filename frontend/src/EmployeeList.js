import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';

class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {employees: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/employees/all')
            .then(response => response.json())
            .then(data => this.setState({employees: data}));
    }

    async remove(id) {
        await fetch(`/employees/${id}`, {
            method: 'DELETE', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedEmployees = [...this.state.employees].filter(i => i.id !== id);
            this.setState({clients: updatedEmployees});
        });
    }

    render() {
        const {employees, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const employeeList = employees.map(employee => {
            return <tr key={employee.id}>
                <td style={{whiteSpace: 'nowrap'}}>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>
                    <ButtonGroup>
                        <Button color="primary" type="button" onClick={() => this.props.history.push("/employees/" + employee.id)}>Edit</Button>
                        <Button color="danger" type="button" onClick={() => this.remove(employee.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (<div>
                <AppNavbar/>
                <Container fluid className={"mt-4"}>
                    <div className="float-end">
                        <Button color="success" onClick={() => this.props.history.push("/employees/new")}>Add Employee</Button>
                    </div>
                    <h3>Employees</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">First name</th>
                            <th width="30%">Last name</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeList}
                        </tbody>
                    </Table>
                </Container>
            </div>);
    }
}

export default EmployeeList;