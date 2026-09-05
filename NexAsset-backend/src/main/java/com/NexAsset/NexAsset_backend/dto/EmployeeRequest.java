package com.NexAsset.NexAsset_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequest {

    @NotBlank(message = "Employee name is required")
    @Size(
        max = 100,
        message = "Employee name cannot exceed 100 characters"
    )
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email")
    @Size(
        max = 150,
        message = "Email cannot exceed 150 characters"
    )
    private String email;

    @Size(
        max = 100,
        message = "Department cannot exceed 100 characters"
    )
    private String department;

    @Size(
        max = 100,
        message = "Job title cannot exceed 100 characters"
    )
    private String jobTitle;
}