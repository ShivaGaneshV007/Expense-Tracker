import moment from 'moment';

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  else if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }

  else if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }

  else if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one digit.");
  }

  else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  return errors;
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (transactions = []) => {
  return transactions.map((t, index) => ({
    ...t,
    uniqueKey: `${t.category || 'No Category'}-${t._id || index}`,
    amount: typeof t.amount === 'number' ? t.amount : parseFloat(t.amount) || 0 // Ensure amount is a number
  }));
};


export const prepareIncomeBarChartData = (data = []) => {
  // Sort income data by date in ascending order
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item, index) => {
    const date = item?.date ? moment(item.date) : null;
    // Format date as "Do MMM" (e.g., "1st Feb", "25th Jul") for the X-axis label
    const formattedDate = date && date.isValid() ? date.format('Do MMM') : `Invalid Date-${index}`;

    return {
      // Create uniqueKey in the format "FormattedDate-ID" for X-axis dataKey
      uniqueKey: `${formattedDate}-${item._id || index}`,
      amount: typeof item?.amount === 'number' ? item.amount : parseFloat(item?.amount) || 0,
      // Map 'source' to 'category' so the existing CustomTooltip works correctly
      category: item?.source || 'No Source',
      // Keep original date for tooltip display
      date: item?.date,
      // Include original source as well if needed
      source: item?.source,
    };
  });

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};
