package com.NexAsset.NexAsset_backend.dto;

import com.NexAsset.NexAsset_backend.enums.AssetCondition;
import com.NexAsset.NexAsset_backend.enums.AssetStatus;
import com.NexAsset.NexAsset_backend.enums.AssetType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetResponse {

    private Long id;

    private String assetName;

    private AssetType type;

    private String serialNumber;

    private AssetStatus status;

    private AssetCondition condition;

    private LocalDate purchaseDate;

    private BigDecimal purchaseValue;

    private String notes;

    private Long assignedToId;

    private String assignedToName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}