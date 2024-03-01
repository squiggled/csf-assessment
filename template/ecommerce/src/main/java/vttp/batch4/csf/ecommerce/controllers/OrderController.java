package vttp.batch4.csf.ecommerce.controllers;


import java.io.Reader;
import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.batch4.csf.ecommerce.exceptions.OrderFailException;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping("/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path="/order")
  public ResponseEntity<String> postOrder(@RequestBody String order) {

    Reader reader = new StringReader(order);
    System.out.println("order in controller " + order);
    JsonReader jsonReader = Json.createReader(reader);
    JsonObject obj = jsonReader.readObject();
    Order newOrder = new Order();
    newOrder.setAddress(obj.getString("address"));
    // System.out.println("address found? " + newOrder.getAddress());
    //order in controller {"name":"fdsfds","address":"fsfsfsdfs","priority":false,"comments":""}
    newOrder.setName(obj.getString("name"));
    newOrder.setPriority(obj.getBoolean("priority"));
    newOrder.setComments(obj.getString("comments"));
    JsonObject cartObj = obj.getJsonObject("cart"); //access 'lineitems'

    JsonArray lineItemsArr = cartObj.getJsonArray("lineItems");
    List<LineItem> lineItems = new LinkedList<>();
    for (JsonObject lineItemObj : lineItemsArr.getValuesAs(JsonObject.class)){
      LineItem item = new LineItem();
      item.setName(lineItemObj.getString("name"));
      item.setProductId(lineItemObj.getString("prodId"));
      item.setQuantity(lineItemObj.getInt("quantity"));
      item.setPrice(lineItemObj.getInt("price"));
      System.out.println("working? line item price" + item.getPrice());
      lineItems.add(item);
    }
    Cart newCart = new Cart();
    newCart.setLineItems(lineItems);
    newOrder.setCart(newCart);
    //cart":{"lineItems":[{"prodId":"65e12d8f5ba8bdd8ab2c445a","quantity":1,"name":"Cheese Slices - Made From Cow Milk 663 g + Cheese Spread - Cream Cheese 100 g","price":710},{"prodId":"65e12d8f5ba8bdd8ab2c445a","quantity":1,"name":"Cheese Slices - Made From Cow Milk 663 g + Cheese Spread - Cream Cheese 100 g","price":710},{"prodId":"65e12d8f5ba8bdd8ab2c445a","quantity":1,"name":"Cheese Slices - Made From Cow Milk 663 g + Cheese Spread - Cream Cheese 100 g","price":710},{"prodId":"65e12d8f5ba8bdd8ab2c3f50","quantity":1,"name":"Butter - Pasteurized","price":510},{"prodId":"65e12d8f5ba8bdd8ab2c3f50","quantity":1,"name":"Butter - Pasteurized","price":510}]}}
	  try {
      poSvc.createNewPurchaseOrder(newOrder);
      JsonObject resp = Json.createObjectBuilder().add("orderId", newOrder.getOrderId()).build();
      return ResponseEntity.ok().body(resp.toString()); 
    } catch (OrderFailException e){
      JsonObject resp = Json.createObjectBuilder().add("message", "BAD REQUEST").build();
      return ResponseEntity.badRequest().body(resp.toString());
    }
  }
}
