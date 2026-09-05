package com.NexAsset.NexAsset_backend.repository;

import com.NexAsset.NexAsset_backend.entity.Asset;
import com.NexAsset.NexAsset_backend.enums.AssetStatus;
import com.NexAsset.NexAsset_backend.enums.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

    Optional<Asset> findBySerialNumber(String serialNumber);

    boolean existsBySerialNumber(String serialNumber);

    List<Asset> findByType(AssetType type);

    List<Asset> findByStatus(AssetStatus status);

    List<Asset> findByTypeAndStatus(AssetType type, AssetStatus status);
    
    List<Asset> findByAssignedToId(Long employeeId);
}