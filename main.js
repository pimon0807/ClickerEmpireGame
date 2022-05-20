
const config = {
    initialPage: document.getElementById("initialPage"),
    mainPage: document.getElementById("mainPage"),
}

class User{
    constructor(name, age, days, money, items){
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.clickCount = 0;
        this.incomePerClick = 25;
        this.incomePerSec = 0;
        this.stock = 0;
        this.items = items;
    }
}

class Item{
    constructor(name, type, currAmount, maxAmount, perMoney, perRate, price, url){
        this.name = name;
        this.type = type;
        this.currAmount = currAmount;
        this.maxAmount = maxAmount;
        this.perMoney = perMoney;
        this.perRate = perRate;
        this.price = price;
        this.url = url;
    }
}

class View{
    static createInitialPage(){
        let container = document.createElement("div");
        container.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center");
        container.innerHTML =
        `
        <div class="text-center p-4 col-md-7">
            <h1 class="pb-5 text-warning">Clicker Empire Game</h1>
            <form class="d-flex justify-content-center">
                <input class="form-control col-6" type="text" placeholder="input your name">
            </form>
            <div class="d-flex justify-content-between p-4">
                <div class="col-6 pl-0">
                    <button type="submit" class="btn btn-light col-12" id="newGame">New Game</button>
                </div>
                <div class="col-6 pl-0">
                    <button type="submit" class="btn btn-light col-12" id="login">Login</button>
                </div>
            </div>
        </div>
        `;

        return config.initialPage.append(container);
    }

    static createMainPage(user){
        let container = document.createElement("div");
        container.innerHTML =
        `
        <div class="d-flex justify-content-center p-md-5 pb-5">
            <div class="bg-navy p-2 d-flex col-md-11 col-lg-10">
                <div class="bg-dark p-2 col-4 id=burgerStatus">
                </div>
            </div>
            
            <div class="col-8">
                <div class="p-1 bg-navy" id="userInfo">
                </div>
                
                <div class="bg-dark mt-2 p-1 overflow-auto flowHeight" id="displayItems">
                </div>
                
                <div class="d-flex justify-content-end mt-2">
                    <div class="border p-2 mr-2 hover" id="reset">
                        <i class="fas fa-undo fa-2x text-white"></i>
                    </div>
                    <div class="border p-2 hover" id="save">
                        <i class="fas fa-save fa-2x text-white"></i>
                    </div>
                </div>            
            </div>
        </div>
        `;

        container.querySelectorAll("#userInfo")[0].append(View.createUserInfo(user));
        return container;
    }

    static createUserInfo(user){
        let container = document.createElement("div");
        container.classList.add("d-flex", "flex-wrap", "p-1")
        container.innerHTML =
        `
        <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
            <p>${user.name}</p>
        </div>
        <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
            <p>${user.age} years old</p>
        </div>
        <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
            <p>${user.days} days</p>
        </div>
        <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
            <p>￥${user.money}</p>
        </div>
        `;
        return container;
    }
}

class Controller{
    static startGame(){
        View.createInitialPage();
        let newGamebtn = config.initialPage.querySelectorAll("#newGame")[0];
        newGamebtn.addEventListener("click", () => {
            let userName = config.initialPage.querySelectorAll("input")[0].value;
            if(userName === ""){
                alert("Please put your name!!!");
            }else{
                let newUser = Controller.createInitialUserAccount(userName);
                Controller.moveInitialToMain(newUser);
            }
        })
    }

    static createInitialUserAccount(userName){
        let itemList = [
            new Item("Flip machine", "ability", 0, 500, 25, 0, 15000, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"),
            new Item("ETF Stock", "investment", 0, -1, 0, 0.1, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
            new Item("ETF Bonds", "investment", 0, -1, 0, 0.07, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
            new Item("Lemonade Stand", "realState", 0, 1000, 30, 0, 30000, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
            new Item("Ice Cream Truck", "realState", 0, 500, 120, 0, 100000, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"),
            new Item("House", "realState", 0, 100, 32000, 0, 20000000, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"),
            new Item("TownHouse", "realState", 0, 100, 64000, 0, 40000000, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"),
            new Item("Mansion", "realState", 0, 20, 500000, 0, 250000000, "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"),
            new Item("Industrial Space", "realState", 0, 10, 2200000, 0, 1000000000, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"),
            new Item("Hotel Skyscraper", "realState", 0, 5, 25000000, 0, 10000000000, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"),
            new Item("Bullet-Speed Sky Railway", "realState", 0, 1, 30000000000, 0, 10000000000000, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png")
        ]

        return new User(userName, 20, 0, 50000, itemList);
    }

    static moveInitialToMain(user){
        config.initialPage.classList.add("d-none");
        config.mainPage.append(View.createMainPage(user));
    }
}
 Controller.startGame();