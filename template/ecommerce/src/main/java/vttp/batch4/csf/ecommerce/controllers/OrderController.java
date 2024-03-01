package vttp.batch4.csf.ecommerce.controllers;


import java.io.Reader;
import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
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
    newOrder.setComments("comments");
    
	  poSvc.createNewPurchaseOrder(newOrder);
	 return null;
  }
}
