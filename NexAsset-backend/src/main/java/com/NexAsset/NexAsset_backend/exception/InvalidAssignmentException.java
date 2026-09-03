package com.NexAsset.NexAsset_backend.exception;

@SuppressWarnings("serial")
public class InvalidAssignmentException extends RuntimeException {

    public InvalidAssignmentException(String message) {
        super(message);
    }
}