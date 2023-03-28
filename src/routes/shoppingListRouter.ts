import { Router } from "express";
import { addShoppingList } from "../controllers/shoppingList";
import createShoppingListValidators from "../middlewares/validators/createShoppingListValidators";

const router = Router();

router.post("/shoppingLists/add", createShoppingListValidators, addShoppingList);

export default router;
