import { Router } from "express";
import {
    addShoppingList,
    getShoppingLists,
    addProduct,
    deleteProduct,
} from "../controllers/shoppingList";
import createShoppingListValidators from "../middlewares/validators/createShoppingListValidators";
import addProductValidators from "../middlewares/validators/addProductValidators";
import { deleteShoppingList, updateProduct, updateShoppingList } from "../controllers/shoppingList";

const router = Router();

router.post("/shoppingList", createShoppingListValidators, addShoppingList);
router.get("/shoppingList", getShoppingLists);
router.delete("/shoppingList/:id", deleteShoppingList);
router.put("/shoppingList/:id", updateShoppingList);
router.post("/product/:id", addProductValidators, addProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);

export default router;
