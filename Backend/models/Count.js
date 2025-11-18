import mongoose from "mongoose";

const countSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  countDelta: { 
    type: Number, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
});
countSchema.index({ user: 1, timestamp: -1 });


export default mongoose.model("Count", countSchema);
