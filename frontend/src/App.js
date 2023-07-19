import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EmployeeList from './EmployeeList';
import EmployeeEdit from "./EmployeeEdit";

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path={'/'} Component={EmployeeList}/>
                    <Route path={'/employees'} Component={EmployeeList}/>
                    <Route path={'/employees/:id'} Component={EmployeeEdit}/>
                </Routes>
            </Router>
        );
    }
}

export default App;
