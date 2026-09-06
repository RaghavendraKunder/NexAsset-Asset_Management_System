package com.NexAsset.NexAsset_backend.service.impl;

import com.NexAsset.NexAsset_backend.dto.AssetRequest;
import com.NexAsset.NexAsset_backend.dto.AssetResponse;

import com.NexAsset.NexAsset_backend.entity.Asset;
import com.NexAsset.NexAsset_backend.entity.Employee;

import com.NexAsset.NexAsset_backend.exception.ResourceNotFoundException;

import com.NexAsset.NexAsset_backend.repository.AssetRepository;
import com.NexAsset.NexAsset_backend.repository.EmployeeRepository;
import com.NexAsset.NexAsset_backend.service.AssetService;

import com.NexAsset.NexAsset_backend.enums.AssetStatus;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;
    private final EmployeeRepository employeeRepository;
    
    
    //====================== Creating Asset =================================
    @Override
    public AssetResponse createAsset(AssetRequest request) {
        // Check for duplicate serial number
        if (assetRepository.existsBySerialNumber(request.getSerialNumber())) {
            throw new RuntimeException("Asset with serial number '" + request.getSerialNumber() + "' already exists");
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
    
    //=================== Get All Asset ==================
    @Override
    public List<AssetResponse> getAllAssets() {
        return assetRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    //================== Update Asset ======================
    @Override
    public AssetResponse updateAsset(Long assetId,AssetRequest request) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset with id" + assetId + "not found")
                );
        // Check serial number only if it is being changed
        if (!asset.getSerialNumber().equals(request.getSerialNumber())
                && assetRepository.existsBySerialNumber(request.getSerialNumber())) {
            throw new RuntimeException("Asset with serial number '" + request.getSerialNumber() + "'already exists");
        }
        asset.setAssetName(request.getAssetName());
        asset.setType(request.getType());
        asset.setSerialNumber(request.getSerialNumber());
        asset.setStatus(request.getStatus());
        asset.setCondition(request.getCondition());
        asset.setPurchaseDate(request.getPurchaseDate());
        asset.setPurchaseValue(request.getPurchaseValue());
        asset.setNotes(request.getNotes());
        Asset updatedAsset = assetRepository.save(asset);
        return mapToResponse(updatedAsset);
    }

    //====================== Delete Asset ====================
    @Override
    public void deleteAsset(Long assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Asset with id" + assetId + "not found"));
        assetRepository.delete(asset);
    }

    //======================= Assign Asset =====================
    @Override
    public AssetResponse assignAsset(Long assetId, Long employeeId) {

        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset with id " + assetId + " not found"));
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with id" + employeeId + "not found"));
        asset.setAssignedTo(employee);
        asset.setStatus(AssetStatus.ASSIGNED);
        Asset savedAsset = assetRepository.save(asset);
        return mapToResponse(savedAsset);
    }

    //========================= Unassign Asset =====================
    @Override
    public AssetResponse unassignAsset(Long assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset with id " + assetId + "not found"));
        asset.setAssignedTo(null);
        asset.setStatus(AssetStatus.AVAILABLE);
        Asset savedAsset = assetRepository.save(asset);
        return mapToResponse(savedAsset);
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
                .assignedToId(asset.getAssignedTo() != null
                        ? asset.getAssignedTo().getId()
                        : null
                )
                .assignedToName(asset.getAssignedTo() != null
                        ? asset.getAssignedTo().getName()
                        : null
                )
                .createdAt(asset.getCreatedAt())
                .updatedAt(asset.getUpdatedAt())
                .build();
    }
}