const Transaction = require("../models/Transaction");

const buildExpenseCategoryPipeline = ({ startDate, endDate, category } = {}) => {
	const matchStage = {
		type: "expense",
	};

	if (startDate || endDate) {
		matchStage.date = {};

		if (startDate) {
			matchStage.date.$gte = new Date(startDate);
		}

		if (endDate) {
			matchStage.date.$lte = new Date(endDate);
		}
	}

	if (category) {
		matchStage.category = category;
	}

	return [
		{ $match: matchStage },
		{
			$facet: {
				categoryTotals: [
					{
						$group: {
							_id: "$category",
							amount: { $sum: "$amount" },
						},
					},
					{
						$sort: { amount: -1 },
					},
				],
				totalExpenses: [
					{
						$group: {
							_id: null,
							amount: { $sum: "$amount" },
						},
					},
				],
			},
		},
		{
			$project: {
				totalExpenseAmount: {
					$ifNull: [{ $arrayElemAt: ["$totalExpenses.amount", 0] }, 0],
				},
				categoryTotals: 1,
			},
		},
	];
};

exports.getExpenseCategoryReport = async (filters = {}) => {
	const [report = { totalExpenseAmount: 0, categoryTotals: [] }] =
		await Transaction.aggregate(buildExpenseCategoryPipeline(filters));

	const totalExpenseAmount = report.totalExpenseAmount || 0;

	return {
		totalExpenseAmount,
		categoryTotals: report.categoryTotals.map((entry) => {
			const amount = entry.amount || 0;

			return {
				category: entry._id || "Uncategorized",
				amount,
				percent: totalExpenseAmount > 0 ? Number(((amount / totalExpenseAmount) * 100).toFixed(2)) : 0,
			};
		}),
	};
};

exports.getExpenseCategoryBreakdown = async (filters = {}) => {
	const report = await exports.getExpenseCategoryReport(filters);
	return report.categoryTotals;
};

exports.buildExpenseCategoryPipeline = buildExpenseCategoryPipeline;

