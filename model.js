import { clearFields } from "./views.js";

class Expense {
    constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    calcPercentage(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    getPercentage() {
        return this.percentage;
    }
}

class Income {
    constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
}

const data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percentage: -1
};

console.log(data);

export const addItem = (type, des, val) => {
    let ID;
    data.allItems[type].length > 0
        ? (ID = data.allItems[type][data.allItems[type].length - 1].id + 1)
        : (ID = 0);

    let newItem;
    type === "exp"
        ? (newItem = new Expense(ID, des, val))
        : (newItem = new Income(ID, des, val));

    data.allItems[type].push(newItem);

    return newItem;
};

export const dataDeleteItem = (type, id) => {
    const ids = data.allItems[type].map(cur => {
        return cur.id;
    });

    const index = ids.indexOf(id);

    if (index !== -1) {
        data.allItems[type].splice(index, 1);
    }
};

const calculateTotal = type => {
    let sum = 0;
    data.allItems[type].forEach(cur => {
        sum += cur.value;
    });

    data.totals[type] = sum;
};

export const calculateBudget = () => {
    //calc total incom end expenses
    calculateTotal("exp");
    calculateTotal("inc");

    //calc the budget inc-exp
    data.budget = data.totals.inc - data.totals.exp;

    //calc the percentage
    data.totals.inc > 0
        ? (data.percentage = Math.round(
              (data.totals.exp / data.totals.inc) * 100
          ))
        : (data.percentage = -1);
};

export const calculatePercentages = () => {
    data.allItems.exp.forEach(cur => {
        cur.calcPercentage(data.totals.inc);
    });
};

export const getPercentages = () => {
    const allPercentages = data.allItems.exp.map(cur => {
        return cur.getPercentage();
    });
    return allPercentages;
};

export const getBudget = () => {
    return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percent: data.percentage
    };
};

//LocalStorage

export const localStorageData = () => {
    localStorage.setItem("data", JSON.stringify(data));
};

export const getLocalData = () => {
    const localData = JSON.parse(localStorage.getItem("data"));
    return localData;
};

export const deleteLocalData = () => {
    localStorage.removeItem("data");
};

export const updateLocalData = localStorageData => {
    data.totals = localStorageData.totals;
    data.budget = localStorageData.budget;
    data.percentage = localStorageData.percentage;
};
