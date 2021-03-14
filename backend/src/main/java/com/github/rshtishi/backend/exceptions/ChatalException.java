package com.github.rshtishi.backend.exceptions;

public class ChatalException extends RuntimeException {

    public ChatalException(String message,Exception exception){
        super(message,exception);
    }

    public ChatalException(String message) {
        super(message);
    }
}
