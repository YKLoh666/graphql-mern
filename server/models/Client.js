import mongoose from "mongoose";

const ClientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export default mongoose.model("Client", ClientSchema);
