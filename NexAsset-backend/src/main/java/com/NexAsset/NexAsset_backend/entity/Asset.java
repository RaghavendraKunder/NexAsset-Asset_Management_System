package com.NexAsset.NexAsset_backend.entity;

import com.NexAsset.NexAsset_backend.enums.AssetCondition;
import com.NexAsset.NexAsset_backend.enums.AssetStatus;
import com.NexAsset.NexAsset_backend.enums.AssetType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "assets",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_asset_serial_number",
            columnNames = "serial_number"
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(
        nullable = false,
        length = 100
    )
    private String assetName;


    @Enumerated(EnumType.STRING)
    @Column(
        name = "asset_type",
        nullable = false,
        length = 30
    )
    private AssetType type;


    @Column(
        name = "serial_number",
        nullable = false,
        unique = true,
        length = 100
    )
    private String serialNumber;


    @Enumerated(EnumType.STRING)
    @Column(
        name = "asset_status",
        nullable = false,
        length = 30
    )
    @Builder.Default
    private AssetStatus status = AssetStatus.AVAILABLE;


    @Enumerated(EnumType.STRING)
    @Column(
        name = "asset_condition",
        nullable = false,
        length = 20
    )
    @Builder.Default
    private AssetCondition condition = AssetCondition.NEW;
    

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;


    @Column(
        name = "purchase_value",
        precision = 12,
        scale = 2
    )
    private BigDecimal purchaseValue;


    @Column(
        columnDefinition = "TEXT"
    )
    private String notes;


    /*
     * The asset can optionally be assigned to a user.
     * This will be used later by the Assign Asset functionality.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private Employee assignedTo;


    @Column(
        nullable = false,
        updatable = false
    )
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();


    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();


    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        if (createdAt == null) {
            createdAt = now;
        }

        if (updatedAt == null) {
            updatedAt = now;
        }

        if (status == null) {
            status = AssetStatus.AVAILABLE;
        }

        if (condition == null) {
            condition = AssetCondition.NEW;
        }
    }


    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}