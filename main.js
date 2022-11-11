const config = {
    initialPage: document.getElementById("initialPage"),
    mainPage: document.getElementById("mainPage"),
}

class User {
    constructor(name, age, days, money, items) {
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.items = items
        this.incomePerClick = 0;
        this.incomePerSec = 0;
        this.clickCounter = 0;
    }

}

class Item {
    constructor(name,price, maxAmount, currAmount, url) {
        this.name = name;
        this.price = price;
        this.maxAmount = maxAmount;
        this.currAmount = currAmount;
        this.url = url;
    }
}

class Ability extends Item {
    constructor(name, price, maxAmount, currAmount, url, incomePerClick) {
        super(name, price, maxAmount, currAmount, url);
        this.type = "ability";
        this.incomePerClick = incomePerClick;
    }
}

class Investment extends Item {
    constructor(name, price, maxAmount, currAmount, url, incomeRatePerSec) {
        super(name, price, maxAmount, currAmount, url);
        this.type = "investment";
        this.incomeRatePerSec = incomeRatePerSec;
        this.reverseAmount = 0;
    }
}

class RealEstate extends Item {
    constructor(name, price, maxAmount, currAmount, url, incomePerSec) {
        super(name, price, maxAmount, currAmount, url);
        this.type = "realEstate";
        this.incomePerSec = incomePerSec;
    }
}

class View {
    static createInitialPage() {
        let container = document.createElement("div");
        container.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center");
        container.innerHTML =
            `
            <div>
                <h2 class="text-warning pb-3">Clicker Empire Game</h2>
                <div class="d-flex justify-content-between">
                    <div class="col-6">
                        <button id="newGame" class="btn btn-primary">New Game</button>
                    </div>
                    <div class="col-6">
                        <button id="loadGame" class="btn btn-primary">Load Game</button> 
                    </div>
                </div>
            </div>
            `;

        return config.initialPage.append(container);
    }

    static createInputNameForm() {
        let container = document.createElement("div");
        container.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center");
        container.innerHTML =
            `
            <div class="bg-white p-2">
                <h2>What is your name?</h2>
                <input type="text" class="form-control my-3">
                <div class="d-flex justify-content-between">
                    <div class="col-6">
                        <button id="goback" class="btn btn-primary col-12">Go Back</button>
                    </div>
                    <div class="col-6">
                        <button id="startGame" class="btn btn-primary col-12">Start Game</button>
                    </div>
                </div>
            </div>
            `;

        container.querySelectorAll("#goback")[0].addEventListener("click", function (){
            config.initialPage.classList.remove("d-none");
            config.mainPage.innerHTML = "";
        })

        return container;
    }

    static createMainPage(user) {
        let container = document.createElement("div");
        container.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center", "bg-light")
        container.innerHTML =
            `
            <div class="bg-dark d-flex flex-row justify-content-center align-items-center col-12 p-3">
                <div id="burgerInfo" class="bg-darkNavy col-4 p-3">
                </div>
                <div class="col-8">
                    <div id="userInfo" class="bg-darkNavy my-3">
                    </div>
                    
                    <div id="itemList" class="overflow-auto boxsize">
                    </div>
                    <div class="d-flex justify-content-end m-2">
                        <div id="reset">
                            <i class="fas fa-undo fa-2x text-white"></i>
                        </div>
                        <div id="save">
                            <i class="fas fa-save fa-2x text-white"></i>
                        </div>
                    </div>
                </div>
            </div>
            `;

        container.querySelectorAll("#burgerInfo")[0].append(View.createBurgerInfo(user));
        container.querySelectorAll("#userInfo")[0].append(View.createUserInfo(user));
        container.querySelectorAll("#itemList")[0].append(View.createItemList(user));

        container.querySelectorAll("#save")[0].addEventListener("click", function (){
            Controller.saveData(user);
        })
        
        container.querySelectorAll("#reset")[0].addEventListener("click", function (){
            Controller.resetData(user);
        })
        return container;
    }

    static createBurgerInfo(user) {
        let container = document.createElement("div");
        container.innerHTML =
            `
                <div class="text-white text-center bg-dark p-1">
                    <h3 id="clickCounter">${user.clickCounter} Burgers</h3>
                    <div id="incomePerClick">
                        <p>one click $${user.incomePerClick}</p>
                    </div>
                    <div id="incomePerSec">
                        <p>$ ${Controller.convertUnit(user.incomePerSec)} per second</p>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width=80% class="py-2 hover img-fuid" id="burger">
                </div>
            `;

        let bergerClick = container.querySelectorAll("#burger")[0];
        bergerClick.addEventListener("click", function (){
            Controller.calOneClickBurger(user);
        });

        return container;
    }

    static updateBurgerInfo(user) {
        config.mainPage.querySelectorAll("#clickCounter")[0].innerHTML = "";
        config.mainPage.querySelectorAll("#clickCounter")[0].innerHTML = `<h3>${user.clickCounter} Burgers</h3>`;
    }

    static createUserInfo(user) {
        let container = document.createElement("div");
        container.classList.add("text-center", "text-white", "d-flex", "flex-wrap");
        container.innerHTML =
            `
                <div class="col-6 border">
                    <p>${user.name}</p>
                </div>
                <div id="userAge" class="col-6 border">
                    <p>${user.age} years old</p>
                </div>
                <div id="userDays" class="col-6 border">
                    <p>${user.days} days</p>
                </div>
                <div id="userMoney" class="col-6 border">
                    <p>$ ${Controller.convertUnit(user.money)}</p>
                </div>
            `;

        return container;
    }

    static updateMoney(user) {
        config.mainPage.querySelectorAll("#userMoney")[0].innerHTML = "";
        config.mainPage.querySelectorAll("#userMoney")[0].innerHTML = `<p>$ ${user.money}</p>`;
    }

    static createItemList(user) {
        let container = document.createElement("div");
        container.classList.add("bg-white")
        for(let i=0; i<user.items.length; i++){
            let itemInfo = document.createElement("div");
            itemInfo.innerHTML =
                `
                <div id="${''+i}" class="d-flex align-items-center m-1 border h-25">
                    <div class="d-none d-block p-1 col-3">
                        <img src=${user.items[i].url} width="25%" class="img-fluid">
                    </div>
                    <div class="col-9 d-flex flex-row justify-content-between align-items-center">
                        <div class="col-10">
                            <div class="d-flex align-items-center">
                                <h4>${user.items[i].name}</h4>
                            </div>
                            <div id="${'income'+i}" class="d-flex flex-row justify-content-between">
                                <p>$${Controller.convertUnit(user.items[i].price)}</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-center">
                            <p>${user.items[i].currAmount}</p>
                        </div>
                    </div>
                  </div>
                `;

            itemInfo.addEventListener("click", function(){
                config.mainPage.querySelectorAll("#itemList")[0].innerHTML = "";
                config.mainPage.querySelectorAll("#itemList")[0].append(View.createPurchasePage(user, user.items[i]));
            });
            itemInfo.querySelectorAll("#income"+i)[0].innerHTML +=  View.incomeInfo(user.items[i])
            container.append(itemInfo);
        }

        return container;
    }

    static incomeInfo(item) {
        if(item.type === "ability"){
            return `<p>+$${Controller.convertUnit(Controller.calculateProfit(item))} / click</p>`;
        }else{
            return `<p>+$${Controller.convertUnit(Controller.calculateProfit(item))} / sec</p>`;
        }
    }

    static detailIncomeInfo(item) {
        if(item.type === "ability"){
            return `<p>Get ${Controller.convertUnit(Controller.calculateProfit(item))} extra daller per click</p>`;
        }else{
            return `<p>Get ${Controller.convertUnit(Controller.calculateProfit(item))} extra daller per second</p>`;
        }
    }

    static createPurchasePage(user, item) {
        let container = document.createElement("div");
        container.innerHTML =
            `
            <div class="col-12 bg-white p-3">
                <div class="d-flex flex-row align-items-center justify-content-center">
                    <div class="col-8">
                        <h3>${item.name}</h3>
                        <p>Max Purchase: ${item.maxAmount}</p>
                        <p>Price: $${Controller.convertUnit(item.price)}</p>
                        <p>${View.detailIncomeInfo(item)}</p>
                    </div>
                    <div>
                        <img src="${item.url}" width="25%" class="col-12">
                    </div>
                </div>
                <div>
                    <h4>How Many would you like to purchase?</h4>
                    <input class="form-control" id="totalItems" type="number" placeholder="" max="${Controller.calculateMaxAmount(user.money, item)}" min="0">
                </div>
                <div id="total" class="d-flex justify-content-end">
                    <h4>Total: $0</h4>
                </div>
                <div class="d-flex flex-row col-12 justify-content-between">
                    <button id="goBack" class="btn btn-secondary col-5">Go Back</button>
                    <button id="purchase" class="btn btn-primary col-5" disabled>Purchase</button>
                </div>
            </div>
            `;
        container.querySelectorAll("#totalItems")[0].addEventListener("change", function (){
            let inputNumberOfItems = container.querySelectorAll("#totalItems")[0].value;
            container.querySelectorAll("#total")[0].innerHTML =
                `
                <h4>Total: $${Controller.calculateTotalPrice(item, inputNumberOfItems)}</h4>
                `;
            Controller.removeDisabled(user, inputNumberOfItems, item);
        })

        let goBackBtn = container.querySelectorAll("#goBack")[0];
        goBackBtn.addEventListener("click", function () {
            config.mainPage.querySelectorAll("#itemList")[0].innerHTML = "";
            config.mainPage.querySelectorAll("#itemList")[0].append(View.createItemList(user));
        });

        let purchaseBtn = container.querySelectorAll("#purchase")[0];
        purchaseBtn.addEventListener("click", function () {
            let inputNumberOfItems = container.querySelectorAll("#totalItems")[0].value;
            Controller.purchaseItem(user, inputNumberOfItems, item);
        })
        return container;
    }

    static updateTimerEffects(user) {
        config.mainPage.querySelectorAll("#userDays")[0].innerHTML =
            `
            <p>${user.days} days</p>
            `;
        config.mainPage.querySelectorAll("#userMoney")[0].innerHTML =
            `
            <p>$ ${Controller.convertUnit(user.money)}</p>
            `;
        config.mainPage.querySelectorAll("#incomePerSec")[0].innerHTML =
            `
            <p>$ ${Controller.convertUnit(user.incomePerSec)} per second</p>
            `;
        config.mainPage.querySelectorAll("#incomePerClick")[0].innerHTML =
            `
            <p>one click $${user.incomePerClick}</p>
            `;
    }

    static updateAge(user) {
         config.mainPage.querySelectorAll("#age")[0].innerHTML =
            `
            <p>${user.age} years old</p>
            `;
    }
}


class Controller {
    static selectGame() {
        View.createInitialPage();
        let newGameBtn = config.initialPage.querySelectorAll("#newGame")[0];
        newGameBtn.addEventListener("click", function () {
            Controller.moveInitialToInputName();
            Controller.startGame();
        })
        let loadGameBtn = config.initialPage.querySelectorAll("#loadGame")[0];
        loadGameBtn.addEventListener("click", function () {
            Controller.moveInitialToInputName();
            Controller.loadGame();
        })
    }

    static moveInitialToInputName() {
        config.initialPage.classList.add("d-none");
        config.mainPage.append(View.createInputNameForm());
    }

    static moveInputNameToMain(user) {
        config.mainPage.innerHTML = "";
        config.mainPage.append(View.createMainPage(user));
    }

    static startGame() {
        let startGameBtn = config.mainPage.querySelectorAll("#startGame")[0];
        startGameBtn.addEventListener("click", function (){
            let userName = config.mainPage.querySelectorAll("input")[0].value;
            if(userName === ""){
                alert("Please put your name");
            }else{
                let user = Controller.createInitialUserAccount(userName);
                Controller.moveInputNameToMain(user);
                Controller.startTimer(user);
            }
        })
    }

    static createInitialUserAccount(userName) {
        let itemsList = [
            new Ability("Flip machine", 15000, 500, 1, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", 25),
            new Investment("ETF Stock", 300000, Infinity, 0, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 0.001),
            new Investment("ETF Bonds", 300000, Infinity, 0, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 0.0007),
            new RealEstate("Lemonade Stand", 30000, 1000, 0, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", 30),
            new RealEstate("Ice Cream Truck", 100000, 500, 0, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png", 120),
            new RealEstate("House", 20000000, 100, 0, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png", 32000),
            new RealEstate("TownHouse", 40000000, 100, 0, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png", 64000),
            new RealEstate("Mansion", 250000000, 20, 0, "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png", 500000),
            new RealEstate("Industrial Space", 1000000000, 10, 0, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png", 2200000),
            new RealEstate("Hotel Skyscraper", 10000000000, 5, 0, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png", 25000000),
            new RealEstate("Bullet-Speed Sky Railway", 10000000000000, 1, 0, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png", 30000000000),
        ];

        return  new User(userName, 18, 0, 50000, itemsList);
    }

    static calOneClickBurger(user) {
        user.money += user.incomePerClick;
        user.clickCounter++;
        View.updateBurgerInfo(user);
        View.updateMoney(user);
    }

    static calculateProfit(item) {
        if(item.type === "ability"){
            return item.currAmount * item.incomePerClick;
        }else if(item.type === "investment"){
            return (item.price + item.reverseAmount) * item.incomeRatePerSec;
        }else if(item.type === "realEstate"){
            return item.incomePerSec
        }
    }


    static convertUnit(number) {
        if (number >= 1e12){
            return number / 1e12 + " trillion";
        }else if(number >= 1e9){
            return number / 1e9 + " billion";
        }else if(number >= 1e6){
            return number / 1e6 + " million";
        }else {
            return number;
        }

    }

    static purchaseItem(user, inputNumberOfItems, item) {
        try {
            if(inputNumberOfItems < item.maxAmount){
            }
        } catch {
            alert(`Over max amount! Please input ${item.maxAmount} or less`);

        }

        let currItem = user.items[user.items.indexOf(item)];
        if(item.name === "ETF Stock"){
            let currTotal = Controller.calculateTotalPrice(item, inputNumberOfItems);
            currItem.reverseAmount += currTotal;
            user.money = user.money - currTotal;
            currItem.price = Math.floor(currItem.price * Math.pow(1.1, inputNumberOfItems));
        }else if(item.type === "investment"){
            currItem.reverseAmount += currItem.price;
        }
        else{
            user.money = user.money - inputNumberOfItems * item.price;
        }

        user.items[user.items.indexOf(item)].currAmount = parseInt(user.items[user.items.indexOf(item)].currAmount) + parseInt(inputNumberOfItems);
        config.mainPage.innerHTML = "";
        config.mainPage.append(View.createMainPage(user));
    }

    static removeDisabled(user, inputNumberOfItems, item) {
        let total = Controller.calculateTotalPrice(item, inputNumberOfItems);
        if(user.money >= total && inputNumberOfItems > 0){
            config.mainPage.querySelectorAll("#purchase")[0].disabled = false;
        }
    }

    static calculateIncomePerSec(user) {
        user.incomePerSec = 0;
        for(let i=0; i<user.items.length; i++){
            if(user.items[i].type === "realEstate"){
                user.incomePerSec = user.items[i].incomePerSec * user.items[i].currAmount + user.incomePerSec;
            }else if(user.items[i].type === "investment"){
                user.incomePerSec = user.items[i].incomeRatePerSec * user.items[i].reverseAmount + user.incomePerSec;
            }
        }
        return user.incomePerSec;
    }

    static calculateIncomePerClick(user) {
        for(let i=0; i<user.items.length; i++){
            if(user.items[i].type === "ability"){
                user.incomePerClick = user.items[i].incomePerClick * user.items[i].currAmount;
            }
        }
        return user.incomePerClick;
    }

    static startTimer(user) {
        setInterval(function (){
            user.days += 1;
            if(user.days % 365 === 0){
                user.age += 1;
                View.updateAge(user);
            }
            user.money += Controller.calculateIncomePerSec(user);
            user.incomePerClick = Controller.calculateIncomePerClick(user);
            View.updateTimerEffects(user);
        }, 1000)
    }

    static calculateTotalPrice(item, inputNumberOfItems) {
        if(item.name === "ETF Stock") {
            let total = 0;
            for (let i = 0; i < inputNumberOfItems; i++) {
                total += item.price * Math.pow(1.1, i);
            }
            return Math.floor(total);
        }else{
            return item.price * inputNumberOfItems;
        }
    }

    static calculateMaxAmount(money, item) {
        if(item.name === "ETF Stock") {
            let amount = 1;
            let total = 0;
            while(money > total){
                total += item.price * Math.pow(1.1, amount);
                amount++;
            }
            return amount-1;
        }else{
            return money/item.price;
        }
    }

    static saveData(user) {
        let data = JSON.stringify(user);
        if(localStorage.getItem(user.name) !== null){
            localStorage.removeItem(user.name);
        }
        localStorage.setItem(user.name, data);
        alert("Save Complete!");
    }

    static loadGame() {
        let startGameBtn = config.mainPage.querySelectorAll("#startGame")[0];
        startGameBtn.addEventListener("click", function (){
            let userName = config.mainPage.querySelectorAll("input")[0].value;
            let saveData = JSON.parse(localStorage.getItem(userName));
            if(saveData === null){
                alert("Data Not Found.")
            }else{
                let player = new User(saveData.name, saveData.age, saveData.days, saveData.money, saveData.items);
                player.incomePerClick = saveData.incomePerClick;
                player.incomePerSec = saveData.incomePerSec;
                player.clickCounter = saveData.clickCounter;
                Controller.moveInputNameToMain(player);
                Controller.startTimer(player);
            }
        })
    }

    static resetData(user) {
        if(localStorage.getItem(user.name) === null){
            alert("Data not saved");
        }else{
            let newUser = Object.assign(user, Controller.createInitialUserAccount(user.name));
            Controller.moveInputNameToMain(newUser);
        }
    }
}

Controller.selectGame();