import { Router } from "express";
import user from "../controllers/user.js";
import item from "../controllers/item.js";

const router = Router();

router.get("/users", user.getAll);
router.post("/register", user.regist);
router.put("/updateuser/:id", user.updateuser);
router.delete("/deleteuser/:id", user.deluser);
router.post("/login", user.login);
router.get("/users/detail/:id", user.getDetail);

router.get("/items", item.getItem);
router.post("/additem", item.addItem);
router.put("/updateitem/:id", item.updateItem);
router.delete("/deleteitem/:id", item.delItem);
router.get("/items/detail/:id", item.getItemDetail);

export default router;
