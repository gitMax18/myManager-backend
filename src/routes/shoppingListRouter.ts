import { Router } from "express";
import createShoppingListValidators from "../middlewares/validators/createShoppingListValidators";
import addProductValidators from "../middlewares/validators/addProductValidators";
import {
    deleteShoppingList,
    updateShoppingList,
    addShoppingList,
    getShoppingLists,
} from "../controllers/shoppingList";
import { addProduct, deleteProduct, updateProduct } from "../controllers/product";

const router = Router();
//shoppingList
router.post("/shoppingList", createShoppingListValidators, addShoppingList);
router.get("/shoppingList", getShoppingLists);
router.delete("/shoppingList/:id", deleteShoppingList);
router.put("/shoppingList/:id", updateShoppingList);
// product
router.post("/product/:id", addProductValidators, addProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);

export default router;
