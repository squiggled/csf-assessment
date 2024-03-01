package vttp.batch4.csf.ecommerce.exceptions;

public class OrderFailException extends RuntimeException{
    public OrderFailException() {
        super("error - checkout failed");
    }

    public OrderFailException(String message) {
        super(message);
    }
    
}
