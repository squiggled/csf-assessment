package vttp.batch4.csf.ecommerce.repositories;

public class Queries {

    public static final String SQL_CREATE_ORDER = """
                INSERT into orders(orderId, date, name, address, priority, comments)
                VALUES (?, ?, ?, ?, ?, ?)
            """;
    public static final String SQL_CREATE_LINEITEM = """
                        INSERT into lineitems(prodId, name, quantity, price)
                        VALUES (?, ?, ?, ?)

            """;
}
