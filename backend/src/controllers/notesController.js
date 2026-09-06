import Note from "../models/Note.js";

async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function get_Note_By_id(req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in get_Note_By_id controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        if (!title?.trim() || !content?.trim()) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = new Note({
            title: title.trim(),
            content: content.trim(),
            user: req.user._id,
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateNote(req, res) {
    try {
        const { title, content } = req.body;

        if (!title?.trim() || !content?.trim()) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title: title.trim(), content: content.trim() },
            { new: true, runValidators: true }
        );

        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { getAllNotes, get_Note_By_id, createNote, updateNote, deleteNote };
