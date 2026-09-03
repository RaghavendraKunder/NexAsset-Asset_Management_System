package com.NexAsset.NexAsset_backend.exception;

@SuppressWarnings("serial")
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}