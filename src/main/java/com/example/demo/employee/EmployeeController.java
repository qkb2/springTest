package com.example.demo.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/employees")
public class EmployeeController {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository) {
        Assert.notNull(employeeRepository, "employeeRepository must not be null!");
        this.employeeRepository = employeeRepository;
    }

    @PostMapping(path = "/add")
    public @ResponseBody String addNewEmployee(
            @RequestParam String firstName,
            @RequestParam String lastName
    ) {
        Employee employee = new Employee();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employeeRepository.save(employee);
        return "Saved";
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
