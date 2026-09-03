package com.NexAsset.NexAsset_backend.exception;

@SuppressWarnings("serial")
public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException(String message) {
        super(message);
    }
}