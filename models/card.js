const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    collection: "card"
  }
);

// CardSchema.statics = {
//   get() {
//     console.log(`Models get ${this}`);
//     return this.findOne({ name: "Adanto Vanguard" })
//       .exec()
//       .then(card => {
//         console.log(card);
//         return card;
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500);
//       });
//   }
// };

module.exports = mongoose.model("Card", CardSchema);
