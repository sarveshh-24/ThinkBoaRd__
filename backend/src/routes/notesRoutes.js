import express from "express";
import {
    getAllNotes,
    get_Note_By_id,
    createNote,
    updateNote,
    deleteNote,
} from "../controllers/notesController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getAllNotes);
router.get("/:id", get_Note_By_id);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
