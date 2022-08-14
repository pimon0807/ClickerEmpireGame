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

class Ability extends Item {
    constructor(name, price, maxAmount, url, incomePerClick) {
        super(name, price, maxAmount, url);
        this.incomePerClick = incomePerClick;
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

        return container;
    }

    static createMainPage(user) {
        let container = document.createElement("div");
        container.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center")
        container.innerHTML =
            `
            <div>
                <p>${user.name}</p>
            </div>
            `;

        return container;
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
            }
        })
    }

    static createInitialUserAccount(userName) {
        let itemsList = [
            new Ability("Flip machine", 15000, 500, "xxx", 25),
            new Investment("ETF Stock", 300000, Infinity, "xxx", 0.001),
            new Investment("ETF Bonds", 300000, Infinity, "xxx", 0.0007),
            new RealEstate("Lemonade Stand", 30000, 1000, "xxx", 30),
            new RealEstate("Ice Cream Truck", 100000, 500, "xxx", 120),
            new RealEstate("House", 20000000, 100, "xxx", 32000),
            new RealEstate("TownHouse", 40000000, 100, "xxx", 64000),
            new RealEstate("Mansion", 250000000, 20, "xxx", 500000),
            new RealEstate("Industrial Space", 1000000000, 10, "xxx", 2200000),
            new RealEstate("Hotel Skyscraper", 10000000000, 5, "xxx", 25000000),
            new RealEstate("Bullet-Speed Sky Railway", 10000000000000, 1, "xxx", 30000000000),
        ];

        return  new User(userName, 18, 0, 50000, itemsList);
    }
}

Controller.selectGame();


