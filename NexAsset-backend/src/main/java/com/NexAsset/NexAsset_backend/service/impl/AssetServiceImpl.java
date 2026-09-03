package com.NexAsset.NexAsset_backend.service.impl;

import com.NexAsset.NexAsset_backend.dto.AssetRequest;
import com.NexAsset.NexAsset_backend.dto.AssetResponse;
import com.NexAsset.NexAsset_backend.entity.Asset;
import com.NexAsset.NexAsset_backend.repository.AssetRepository;
import com.NexAsset.NexAsset_backend.service.AssetService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;

    @Override
    public AssetResponse createAsset(AssetRequest request) {

        // Check for duplicate serial number
        if (assetRepository.existsBySerialNumber(request.getSerialNumber())) {
            throw new RuntimeException(
                "Asset with serial number '" +
                request.getSerialNumber() +
                "' already exists"
            );
        }
        

        // Convert request DTO → Entity
        Asset asset = Asset.builder()
                .assetName(request.getAssetName())
                .type(request.getType())
                .serialNumber(request.getSerialNumber())
                .status(request.getStatus())
                .condition(request.getCondition())
                .purchaseDate(request.getPurchaseDate())
                .purchaseValue(request.getPurchaseValue())
                .notes(request.getNotes())
                .build();

        // Save to MySQL
        Asset savedAsset = assetRepository.save(asset);

        // Convert Entity → Response DTO
        return mapToResponse(savedAsset);
    }
    
    //Get All Asset
    @Override
    public List<AssetResponse> getAllAssets() {

        return assetRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private AssetResponse mapToResponse(Asset asset) {

        return AssetResponse.builder()
                .id(asset.getId())
                .assetName(asset.getAssetName())
                .type(asset.getType())
                .serialNumber(asset.getSerialNumber())
                .status(asset.getStatus())
                .condition(asset.getCondition())
                .purchaseDate(asset.getPurchaseDate())
                .purchaseValue(asset.getPurchaseValue())
                .notes(asset.getNotes())
                .assignedToId(
                    asset.getAssignedTo() != null
                        ? asset.getAssignedTo().getId()
                        : null
                )
                .assignedToName(
                    asset.getAssignedTo() != null
                        ? asset.getAssignedTo().getName()
                        : null
                )
                .createdAt(asset.getCreatedAt())
                .updatedAt(asset.getUpdatedAt())
                .build();
    }
}