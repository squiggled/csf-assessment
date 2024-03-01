package vttp.batch4.csf.ecommerce.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.BooleanOperators.Or;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import vttp.batch4.csf.ecommerce.exceptions.OrderFailException;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
 @Transactional(rollbackFor = OrderFailException.class)
  public void create(Order order) throws OrderFailException{
    try {
      template.update(Queries.SQL_CREATE_ORDER, order.getOrderId(), order.getDate(), order.getName(), order.getAddress(),
        order.getPriority(), order.getComments());
    } catch (OrderFailException e){
      e.printStackTrace();
      throw new OrderFailException();
    }
    Cart cart = order.getCart();
    List<LineItem> items = cart.getLineItems();
    try {
      for (LineItem item : items) {
        template.update(Queries.SQL_CREATE_LINEITEM, item.getProductId(), item.getName(), item.getQuantity(),
            item.getPrice());
      }
    } catch (OrderFailException e){
      e.printStackTrace();
      throw new OrderFailException();
    }
  }
}
