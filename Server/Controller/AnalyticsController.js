const EnergySaving = require('../Models/EnergySavingModel');
const Investment = require('../Models/InvestmentModel'); // Add this

exports.getUserAnalytics = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { period = 'monthly' } = req.query;

        // First, get total investment amount
        const investments = await Investment.aggregate([
            { $match: { user: userId } },
            { $group: {
                _id: null,
                totalInvestment: { $sum: "$investmentAmount" }
            }}
        ]);

        // Get energy savings data
        const now = new Date();
        const dateFilter = {
            date: {
                $gte: new Date(now.setDate(now.getDate() - (period === 'daily' ? 1 : period === 'weekly' ? 7 : 30)))
            }
        };

        const energySavings = await EnergySaving.aggregate([
            {
                $match: {
                    user: userId,
                    ...dateFilter
                }
            },
            {
                $group: {
                    _id: null,
                    totalEnergy: { $sum: '$energyProduced' },
                    totalSavings: { $sum: '$financialSaving' },
                    carbonOffset: { $sum: '$carbonOffset' }
                }
            }
        ]);

        // Get historical data for chart
        const history = await EnergySaving.aggregate([
            {
                $match: {
                    user: userId,
                    ...dateFilter
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    amount: { $sum: "$energyProduced" }
                }
            },
            {
                $sort: { "_id": 1 }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    amount: 1
                }
            }
        ]);

        // Combine all data with safe defaults
        const responseData = {
            totalInvestment: investments[0]?.totalInvestment || 0,
            totalEnergy: energySavings[0]?.totalEnergy || 0,
            totalSavings: energySavings[0]?.totalSavings || 0,
            carbonOffset: energySavings[0]?.carbonOffset || 0,
            history: history || []
        };

        res.status(200).json({
            status: 'success',
            data: responseData
        });
    } catch (error) {
        next(error);
    }
};

  exports.getProjectAnalytics = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        // Aggregate data for the specified project
        const analytics = await Investment.aggregate([
            { $match: { project: projectId } },
            {
                $group: {
                    _id: "$project",
                    totalInvested: { $sum: "$investmentAmount" },
                    totalShares: { $sum: "$shares" }
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: analytics[0] || {} // Return empty object if no data
        });
    } catch (error) {
        next(error);
    }
};