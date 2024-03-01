package vttp.batch4.csf.ecommerce.repositories;

public class Queries {
    
    public static final String SQL_CREATE_ORDER = """
                INSERT into csforders(orderId, date, name, address, priority, comments, cart)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """;
}
