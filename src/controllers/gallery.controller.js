const express = require("express");

const Gallery = require("../models/gallery.model");
const fs = require("fs")
const router = express.Router();

const { uploadMultiple } = require("../middlewares/upload");

router.post("/multiple", uploadMultiple(5, "pictures"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);
    console.log("filePaths:", filePaths);

    const gallery = await Gallery.create({
      user_id: req.body.user_id,
      pictures: filePaths,
    });
    return res.send(gallery);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("", async (req, res) => {
  try {
    const gallery = await Gallery.find().populate("user_id").lean().exec();
    return res.status(200).send(gallery);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let galleryFile = await Gallery.findById(req.params.id).lean().exec();
    let path = galleryFile.pictures;
    // console.log('path:', path)
    deleteAll(path);

    const gallery = await Gallery.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(200).send(gallery);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const remove = (fileName) => {
  return fs.unlink(fileName, (err) => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file: example_file.txt");
    }
  });
};

function deleteAll(ele) {

  for (let i = 0; i < ele.length; i++) {

    remove(ele[i]);
  }
}
module.exports = router;
