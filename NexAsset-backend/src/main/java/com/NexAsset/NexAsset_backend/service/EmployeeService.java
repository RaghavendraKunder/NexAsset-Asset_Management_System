package com.NexAsset.NexAsset_backend.service;

import com.NexAsset.NexAsset_backend.dto.EmployeeRequest;
import com.NexAsset.NexAsset_backend.dto.EmployeeResponse;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(EmployeeRequest request);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse updateEmployee(
        Long id,
        EmployeeRequest request
    );

    void deleteEmployee(Long id);
}