const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection("books").get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (err) {
      console.error("Error counting books:", err);
      res.status(500).send({error: "Error counting books"});
    }
  });
});


exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snap = await admin
          .firestore()
          .collection("books")
          .orderBy("isbn")
          .get();
      const list = snap.docs.map((d) => ({id: d.id, ...d.data()}));
      res.status(200).json(list);
    } catch (e) {
      console.error("getAllBooks error:", e);
      res.status(500).json({error: e.message});
    }
  });
});
