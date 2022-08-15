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
        this.clickCounter = 0;
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
        container.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center", "bg-light")
        container.innerHTML =
            `
            <div class="bg-dark d-flex col-10 p-3">
                <div id="burgerInfo" class="bg-darkNavy col-4 p-3">
                </div>
                <div class="col-8">
                    <div id="userInfo" class="bg-darkNavy">
                    </div>
                    
                    <div id="itemList" class="overflow-auto">
                    </div>
                    
                    <div class="d-flex justify-content-end">
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

        return container;
    }

    static createBurgerInfo(user) {
        let container = document.createElement("div");
        container.innerHTML =
            `
                <div class="text-white text-center bg-dark p-1">
                    <h3 id="clickCounter">${user.clickCounter} Burgers</h3>
                    <p>one click $${user.incomePerClick}</p>
                    <p>$${user.incomePerSec} per second</p>
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
                    <p>$ ${user.money}</p>
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
            new Ability("Flip machine", 15000, 500, "https://cdn.pixabay.com/photo/2016/01/10/12/14/meat-1131717_1280.jpg", 25),
            new Investment("ETF Stock", 300000, Infinity, "https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg", 0.001),
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

    static calOneClickBurger(user) {
        user.money += user.incomePerClick;
        user.clickCounter++;
        View.updateBurgerInfo(user);
        View.updateMoney(user);
    }
}

Controller.selectGame();


