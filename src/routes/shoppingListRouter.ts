import { Router } from "express";
import { addShoppingList, getShoppingLists } from "../controllers/shoppingList";
import createShoppingListValidators from "../middlewares/validators/createShoppingListValidators";

const router = Router();

router.post("/shoppingList", createShoppingListValidators, addShoppingList);
router.get("/shoppingList", getShoppingLists);

export default router;
