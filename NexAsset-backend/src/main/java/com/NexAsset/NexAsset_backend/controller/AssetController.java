package com.NexAsset.NexAsset_backend.controller;

import java.util.List;

import com.NexAsset.NexAsset_backend.dto.AssetRequest;
import com.NexAsset.NexAsset_backend.dto.AssetResponse;
import com.NexAsset.NexAsset_backend.service.AssetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetService assetService;


    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }


    //============== Creating Asset =================
    @PostMapping
    public ResponseEntity<AssetResponse> createAsset(@Valid @RequestBody AssetRequest request) {
        AssetResponse response = assetService.createAsset(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

    //============== Getting All Asset =================
    @GetMapping
    public ResponseEntity<List<AssetResponse>> getAllAssets() {
        List<AssetResponse> assets = assetService.getAllAssets();
        return ResponseEntity.ok(assets);
    }
    
    //================ Assigning Asset ==================
    @PutMapping("/{assetId}/assign/{employeeId}")
    public ResponseEntity<AssetResponse> assignAsset(@PathVariable Long assetId,@PathVariable Long employeeId) {
        AssetResponse response = assetService.assignAsset(assetId, employeeId);
        return ResponseEntity.ok(response);
    }

    //================ Unassigning Asset ===================
    @PutMapping("/{assetId}/unassign")
    public ResponseEntity<AssetResponse> unassignAsset(@PathVariable Long assetId) {
        AssetResponse response = assetService.unassignAsset(assetId);
        return ResponseEntity.ok(response);
    }
    
    //================ Update Asset ===================
    @PutMapping("/{assetId}")
    public ResponseEntity<AssetResponse> updateAsset(@PathVariable Long assetId,@Valid @RequestBody AssetRequest request) {
        AssetResponse response = assetService.updateAsset(assetId, request);
        return ResponseEntity.ok(response);
    }

    //================ Delete Asset ===================
    @DeleteMapping("/{assetId}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long assetId) {
        assetService.deleteAsset(assetId);
        return ResponseEntity.noContent().build();
    }
}