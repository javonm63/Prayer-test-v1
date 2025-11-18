export const getHistory = async (req, res) => {
  try {
    // query validation 
    const userId = req.user.id;
    let { limit = 30, page = 1, range = "daily" } = req.query;

    limit = parseInt(limit, 10);
    page = parseInt(page, 10) || 1;

    const skip = (page - 1) * limit;

    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ message: "Invalid limit" });
    }

    if (!["daily", "weekly", "monthly"].includes(range)) {
      return res.status(400).json({ message: "Invalid range" });
    }

    // aggregation logic
    const groupId = {
        daily: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        weekly: { $week: "$timestamp" },
        monthly: { $month: "$timestamp" }
    };

    const totals = await Count.aggregate([
        { $match: { user: mongoose.Types.ObjectId(userId) } },
        { $group: {
            _id: groupId[range],
            count: { $sum: "$countDelta" }
        }},
        { $sort: { _id: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);

    // streak 
    let streak = 0;
    for (let i = totals.length - 1; i >= 0; i--) {
        if (totals[i].count > 0) streak++;
        else break;
    };

    return res.status(200).json({
        totals: totals.map(item => ({
            date: item._id,
            count: item.count,
            rounds: 0 // fetch Dashboard rounds per day if time allows
        })),
        streak
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};