const { Node, LinkedList, TreeNode } = require('./structures');

class Bank {
    constructor() {
        this.accounts = new LinkedList();
    }

    addAccount(accountNumber, balance) {
        this.accounts.add(accountNumber, balance);
    }

    findAccount(accountNumber) {
        return this.accounts.find(accountNumber);
    }

    transfer(fromAccount, toAccount, amount) {
        const from = this.findAccount(fromAccount);
        const to = this.findAccount(toAccount);

        if (from && to && from.balance >= amount) {
            from.balance -= amount;
            to.balance += amount;
            return true;
        }
        return false;
    }

    checkBalance(accountNumber) {
        const account = this.findAccount(accountNumber);
        return account ? account.balance : null;
    }
}

module.exports = Bank;
