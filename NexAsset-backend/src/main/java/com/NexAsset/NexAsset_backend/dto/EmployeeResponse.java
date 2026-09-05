package com.NexAsset.NexAsset_backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponse {

    private Long id;

    private String name;

    private String email;

    private String department;

    private String jobTitle;

    private Integer assignedAssets;

    private List<String> assets;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}