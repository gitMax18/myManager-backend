import { Router } from "express";
import { addShoppingList, getShoppingLists, addProducts } from "../controllers/shoppingList";
import createShoppingListValidators from "../middlewares/validators/createShoppingListValidators";
import addProductValidators from "../middlewares/validators/addProductValidators";

const router = Router();

router.post("/shoppingList", createShoppingListValidators, addShoppingList);
router.post("/product/:id", addProductValidators, addProducts);
router.get("/shoppingList", getShoppingLists);

export default router;
