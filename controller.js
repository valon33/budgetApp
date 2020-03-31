import {
    getInput,
    addListItem,
    clearFields,
    displayBudget,
    deleteListItem,
    displayPercentages,
    displayMonth
} from "./views.js";
import {
    addItem,
    calculateBudget,
    getBudget,
    dataDeleteItem,
    calculatePercentages,
    getPercentages,
    localStorageData,
    getLocalData,
    deleteLocalData,
    updateLocalData
} from "./model.js";

const updateBudget = () => {
    //Calculate the budget
    calculateBudget();

    //Return the budget
    const budget = getBudget();

    //Display the budget on the UI
    displayBudget(budget);
};

const updatePercentages = () => {
    //calc the percentages
    calculatePercentages();
    //red percentages from the model
    const percentages = getPercentages();
    //update the Ui with th percentages
    displayPercentages(percentages);
};

const getItem = () => {
    const input = getInput();
    console.log(input);

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
        const newItem = addItem(input.type, input.description, input.value);

        addListItem(newItem, input.type);

        clearFields();

        updateBudget();

        updatePercentages();

        localStorageData();
    }
};

const deleteItem = e => {
    // const itemID = e.target.parentNode.parentNode.parentNode.id;
    const itemID = e.target.parentNode.parentNode.parentNode.id;
    console.log(itemID);

    if (itemID) {
        const splitID = itemID.split("-");
        const type = splitID[0];
        const ID = parseInt(splitID[1]);

        dataDeleteItem(type, ID);

        deleteListItem(itemID);

        updateBudget();

        updatePercentages();

        localStorageData();
    }
};

const loadLocalStorageData = () => {
    const localData = getLocalData();

    if (localData) {
        updateLocalData(localData);

        localData.allItems.inc.forEach(cur => {
            const newIncItem = addItem("inc", cur.description, cur.value);
            addListItem(newIncItem, "inc");
        });

        localData.allItems.exp.forEach(cur => {
            const newExpItem = addItem("exp", cur.description, cur.value);
            addListItem(newExpItem, "exp");
        });

        const budget = getBudget();
        displayBudget(budget);

        updatePercentages();
    }
};

export const init = () => {
    document.querySelector(".add__btn").addEventListener("click", getItem);

    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            getItem();
        }
    });

    document.querySelector(".container").addEventListener("click", deleteItem);
    displayMonth();
    displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percent: -1
    });
    loadLocalStorageData();
};
