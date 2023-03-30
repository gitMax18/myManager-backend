import { Router } from "express";
import {
    addShoppingList,
    getShoppingLists,
    addProduct,
    deleteProduct,
} from "../controllers/shoppingList";
import createShoppingListValidators from "../middlewares/validators/createShoppingListValidators";
import addProductValidators from "../middlewares/validators/addProductValidators";

const router = Router();

router.post("/shoppingList", createShoppingListValidators, addShoppingList);
router.post("/product/:id", addProductValidators, addProduct);
router.delete("/product/:id", deleteProduct);
router.get("/shoppingList", getShoppingLists);

export default router;
