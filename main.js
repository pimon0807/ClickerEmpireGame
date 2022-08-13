class User {
    constructor(name, age, days, money, items) {
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.items = items
        this.incomePerClick = 25;
        this.incomePerSec = 0;
    }
}

class Item {
    constructor(name, price, maxAmount, url) {
        this.name = name;
        this.price = price;
        this.maxAmount = maxAmount;
        this.url = url;
    }
}

class Investment extends Item {
    constructor(name, price, maxAmount, url, incomeRatePerSec) {
        super(name, price, maxAmount, url);
        this.incomeRatePerSec = incomeRatePerSec;
    }
}

class RealEstate extends Item {
    constructor(name, price, maxAmount, url, incomePerSec) {
        super(name, price, maxAmount, url);
        this.incomePerSec = incomePerSec;
    }
}


