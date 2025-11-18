import Dashboard from "../models/Dashboard.js";
import User from "../models/User.js";
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';
const require = createRequire(import.meta.url);
const fs = require('fs');

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentUser = await User.findById(userId).select("username");
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let dash = await Dashboard.findOne({ userId });

    if (!dash) {
      dash = new Dashboard({ userId, count: 0, rounds: 0 });
      await dash.save();
    }

    res.json({
      message: `Welcome to your Prayer Dashboard`,
      username: currentUser.username,
      count: dash.count,
      rounds: dash.rounds,
    });
  } catch (err) {
    console.error("❌ Error in /api/dashboard:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateCount = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const userId = req.user.id;
    const increment = req.body.count || 1;

    await session.withTransaction(async () => {
      // Log event
      await Count.create(
        [
          {
            user: userId,
            countDelta: increment,
            timestamp: new Date(),
          },
        ],
        { session }
      );

      // Dashboard running totals
      let dash = await Dashboard.findOne({ userId }).session(session);

      if (!dash) {
        dash = new Dashboard({ userId, count: 0, rounds: 0 });
      }

      // Same logic as before
      dash.count += increment;

      if (dash.count >= 108) {
        dash.rounds += Math.floor(dash.count / 108);
        dash.count = dash.count % 108;
      }

      await dash.save({ session });

      // Response 
      res.json({
        message: "Count updated!",
        count: dash.count,
        rounds: dash.rounds,
      });
    });

    session.endSession();
  } catch (err) {
    session.endSession();
    console.error("❌ Error in /api/dashboard/update:", err);
    res.status(500).json({ error: err.message });
  }
};
