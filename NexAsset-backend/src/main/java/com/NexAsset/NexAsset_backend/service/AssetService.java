package com.NexAsset.NexAsset_backend.service;

import java.util.List;

import com.NexAsset.NexAsset_backend.dto.AssetRequest;
import com.NexAsset.NexAsset_backend.dto.AssetResponse;

public interface AssetService {

    AssetResponse createAsset(AssetRequest request);
    
    List<AssetResponse> getAllAssets();
    
    AssetResponse updateAsset(Long assetId, AssetRequest request);

    void deleteAsset(Long assetId);
    
    AssetResponse assignAsset(Long assetId, Long employeeId);

    AssetResponse unassignAsset(Long assetId);
}