const config = {
    initialPage: document.getElementById("initialPage"),
    mainPage: document.getElementById("mainPage"),
}

class View{
    static createInitialPage(){
        let container = document.createElement("div");
        container.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center");
        container.innerHTML =
        `
        <div class="text-center p-4 col-md-7">
            <h2 class="pb-3 text-warning">Clicker Empire Game</h2>
            <div class="d-flex justify-content-between p-5">
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
}

View.createInitialPage();