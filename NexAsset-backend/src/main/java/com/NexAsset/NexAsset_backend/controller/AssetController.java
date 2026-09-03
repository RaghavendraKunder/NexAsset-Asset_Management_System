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


    @PostMapping
    public ResponseEntity<AssetResponse> createAsset(
        @Valid @RequestBody AssetRequest request
    ) {

        AssetResponse response = assetService.createAsset(request);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }
    
    @GetMapping
    public ResponseEntity<List<AssetResponse>> getAllAssets() {

        List<AssetResponse> assets = assetService.getAllAssets();

        return ResponseEntity.ok(assets);
    }
}