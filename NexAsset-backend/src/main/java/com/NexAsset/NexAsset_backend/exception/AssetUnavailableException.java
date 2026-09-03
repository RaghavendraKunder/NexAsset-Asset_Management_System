package com.NexAsset.NexAsset_backend.exception;

@SuppressWarnings("serial")
public class AssetUnavailableException extends RuntimeException {

    public AssetUnavailableException(String message) {
        super(message);
    }
}