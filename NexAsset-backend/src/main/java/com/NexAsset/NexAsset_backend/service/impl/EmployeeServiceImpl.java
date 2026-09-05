package com.NexAsset.NexAsset_backend.service.impl;

import com.NexAsset.NexAsset_backend.dto.EmployeeRequest;
import com.NexAsset.NexAsset_backend.dto.EmployeeResponse;
import com.NexAsset.NexAsset_backend.entity.Employee;
import com.NexAsset.NexAsset_backend.exception.DuplicateResourceException;
import com.NexAsset.NexAsset_backend.exception.ResourceNotFoundException;
import com.NexAsset.NexAsset_backend.repository.AssetRepository;
import com.NexAsset.NexAsset_backend.repository.EmployeeRepository;
import com.NexAsset.NexAsset_backend.service.EmployeeService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AssetRepository assetRepository;
    

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest request) {

        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                "Employee with email '" +
                request.getEmail() +
                "' already exists"
            );
        }

        Employee employee = Employee.builder()
                .name(request.getName())
                .email(request.getEmail())
                .department(request.getDepartment())
                .jobTitle(request.getJobTitle())
                .build();

        Employee savedEmployee = employeeRepository.save(employee);

        return mapToResponse(savedEmployee);
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Employee with id " + id + " not found"
                    )
                );

        return mapToResponse(employee);
    }

    @Override
    public EmployeeResponse updateEmployee(
            Long id,
            EmployeeRequest request) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Employee with id " + id + " not found"
                    )
                );

        if (!employee.getEmail().equals(request.getEmail())
                && employeeRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException(
                "Employee with email '" +
                request.getEmail() +
                "' already exists"
            );
        }

        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setDepartment(request.getDepartment());
        employee.setJobTitle(request.getJobTitle());

        Employee updatedEmployee =
                employeeRepository.save(employee);

        return mapToResponse(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Employee with id " + id + " not found"
                    )
                );

        employeeRepository.delete(employee);
    }

    private EmployeeResponse mapToResponse(Employee employee) {

        List<String> assignedAssets =
                assetRepository.findByAssignedToId(employee.getId())
                        .stream()
                        .map(asset -> asset.getAssetName())
                        .toList();

        return EmployeeResponse.builder()
                .id(employee.getId())
                .name(employee.getName())
                .email(employee.getEmail())
                .department(employee.getDepartment())
                .jobTitle(employee.getJobTitle())
                .assignedAssets(assignedAssets.size())
                .assets(assignedAssets)
                .createdAt(employee.getCreatedAt())
                .updatedAt(employee.getUpdatedAt())
                .build();
    }
}