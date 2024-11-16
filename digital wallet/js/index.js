function BankAccount(owner, balance) {
    this.owner = owner;
    this.balance = balance;
    this.transactionHistory = [];

    // Update Balance Display
    this.updateBalance = function () {
        document.getElementById("bal").innerHTML = `Balance: ${this.formatCurrency(this.balance)}`;
    };


    // Add Transaction to History
    this.addTransaction = function (type, amount) {
        const transaction = `${type} of ${this.formatCurrency(amount)}`;
        this.transactionHistory.push(transaction);
        const historyList = document.getElementById("transaction-history");
        const listItem = document.createElement("li");
        listItem.innerText = transaction;
        historyList.appendChild(listItem);
    };

    // Validate Input
    this.validateInput = function (input) {
        if (isNaN(input) || input <= 0) {
            alert("Please enter a valid positive number.");
            return false;
        }
        return true;
    };

    // Deposit Method
    this.deposit = function () {
        var amount = document.getElementById("deposit").value;
        if (this.validateInput(amount)) {
            this.balance += Number(amount);
            this.updateBalance();
            this.addTransaction("Deposit", amount);
            this.playSound("deposit");
        }
    };

    // Withdraw Method
    this.withdraw = function () {
        var amount = document.getElementById("withdraw").value;
        if (this.validateInput(amount)) {
            if (Number(amount) <= this.balance) {
                this.balance -= Number(amount);
                this.updateBalance();
                this.addTransaction("Withdraw", amount);
                this.playSound("withdraw");
            } else {
                alert("Insufficient Fund in your Account");
            }
        }
    };
    // Format Amount as Currency
    this.formatCurrency = function (amount) {
    return typeof amount === "number" ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount) : "Invalid amount";
    };

    // Play Sound
    this.playSound = function (type) {
        const sound = document.getElementById(type === "deposit" ? "deposit-sound" : "withdraw-sound");
        if (sound) sound.play();
    };


    // Initialize Balance Display
    this.updateBalance();
}

// Create Bank Account Instance
var eshan = new BankAccount("M.Eshan", 300);
document.getElementById('owner-name').innerHTML = `<span style="color:black;">Account Holder Name:</span> ${eshan.owner}`;

// Update Date and Time
function updateDateTime() {
    const now = new Date();
    document.getElementById("date").innerText = now.toLocaleDateString();
    document.getElementById("time").innerText = now.toLocaleTimeString();
   
}
setInterval(updateDateTime, 1000);
