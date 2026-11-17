package com.example.demo.product;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final List<Product> products = List.of(
            new Product(1L, "Dining Table", 299.99),
            new Product(2L, "Dining Chair", 89.99),
            new Product(3L, "Bedroom Set", 799.00)
    );

    @GetMapping
    public List<Product> getProducts() {
        return products;
    }
}
