export const summarizeTransactionsData = (transactions, startDate, endDate) => {
    const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    let summary = [];

    if (diffInDays <= 7) {
        // Last week or up to 7 days range
        const lastWeekDates = Array.from({ length: 7 }).map((_, index) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + index);
            return {
                value: 0,
                label: formatDate(date, diffInDays) // Updated this line
            } 
        });

        transactions.forEach(transaction => {
            const transactionDate = formatDate(new Date(transaction.date), diffInDays); // Format transaction date consistently
            const dateIndex = lastWeekDates.findIndex(item => item.label === transactionDate);
            if (dateIndex !== -1) {
                lastWeekDates[dateIndex].value += parseFloat(transaction.amount);
            }
        });

        summary = lastWeekDates;
    } else if (diffInDays <= 31) {
        // Last month or up to 31 days range
        const lastMonthDates = Array.from({ length: diffInDays + 1 }).map((_, index) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + index);
            return {
                value: 0,
                label: formatDate(date, diffInDays) // Updated this line
            };
        });

        transactions.forEach(transaction => {
            const transactionDate = formatDate(new Date(transaction.date), diffInDays); // Format transaction date consistently
            const dateIndex = lastMonthDates.findIndex(item => item.label === transactionDate);
            if (dateIndex !== -1) {
                lastMonthDates[dateIndex].value += parseFloat(transaction.amount);
            }
        });

        summary = lastMonthDates;
    } else {
        // Default to monthly summary
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        summary = Array(12).fill(0).map((_, index) => ({
            value: 0,
            label: months[index]
        }));

        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const month = date.getMonth();
            summary[month].value += parseFloat(transaction.amount);
        });
    }

    return summary;
};

const formatDate = (date, diffInDays) => {
    if (diffInDays <= 7) {
        // For last week, display only day/month
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based
        return `${day}/${month}`;
    } else if (diffInDays <= 31) {
        // For last month, display only day/month
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based
        return `${day}/${month}`;
    } else {
        // For last year, display only month name
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return months[date.getMonth()];
    }
};



export const summarizePieChartData = (_transactions, _categoryNames) => {
    const categoryTotals = {};
    const colors = [
      '#009FFF', '#93FCF8', '#BDB2FA', '#FFA5BA', '#FF7F97',
      '#7FFFD4', '#FFD700', '#FF6347', '#87CEEB', '#FF69B4'
    ];
  
    // Calculate total values for each category
    _transactions.forEach((transaction, index) => {
      const categoryName = _categoryNames[transaction.category_id];
      if (categoryName) {
        const amount = parseFloat(transaction.amount);
        categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + amount;
      }
    });
  
    // Create pieData array
    const pieData = Object.entries(categoryTotals).map(([categoryName, total], index) => {
      const color = colors[index % colors.length]; // Use modulo operator to cycle through colors
      return {
        value: parseFloat(total.toFixed(2)), // Convert the total to a float with two decimal places
        category: categoryName,
        color,
      };
    });
  
    return pieData;
  };
