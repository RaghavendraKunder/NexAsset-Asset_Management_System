package com.NexAsset.NexAsset_backend.dto;

import com.NexAsset.NexAsset_backend.enums.AssetCondition;
import com.NexAsset.NexAsset_backend.enums.AssetStatus;
import com.NexAsset.NexAsset_backend.enums.AssetType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetRequest {

    @NotBlank(message = "Asset name is required")
    @Size(max = 100, message = "Asset name cannot exceed 100 characters")
    private String assetName;


    @NotNull(message = "Asset type is required")
    private AssetType type;


    @NotBlank(message = "Serial number is required")
    @Size(max = 100, message = "Serial number cannot exceed 100 characters")
    private String serialNumber;


    @NotNull(message = "Asset status is required")
    private AssetStatus status;


    @NotNull(message = "Asset condition is required")
    private AssetCondition condition;


    private LocalDate purchaseDate;


    @DecimalMin(
        value = "0.0",
        inclusive = true,
        message = "Purchase value cannot be negative"
    )
    private BigDecimal purchaseValue;


    @Size(
        max = 500,
        message = "Notes cannot exceed 500 characters"
    )
    private String notes;
}