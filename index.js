const app = () => {
  let sidePanelOptions = document.querySelectorAll(".side-panel-option");
  let sidePanelOptionSelectorManager = new SidePanelOptionSelectorManager();

  sidePanelOptions.forEach(sidePanelOption => {
    sidePanelOption.addEventListener("click", event => {
      let currentIndex = parseInt(event.target.getAttribute("index"));
      sidePanelOptionSelectorManager.highlight(currentIndex);
      sidePanelContentManager.showContentOnIndex(currentIndex);
    });
  });
};

class SidePanelContentManager {
  constructor(_currentIndex) {
    this.currentIndex = _currentIndex;
  }

  showContentOnIndex(index) {
    let sidePanelOptionContents = document.querySelectorAll(
      ".side-panel-option-content > div"
    );
    sidePanelOptionContents.forEach(content => {
      content.classList.remove("active");
      content.style.transform = `translateY(${-1 * index * 100}%)`;
    });

    let currentContent = document.querySelector(
      `.side-panel-option-content > div:nth-child(${index + 1})`
    );
    currentContent.classList.add("active");
  }
}

class SidePanelOptionSelectorManager {
  constructor() {
    this.index = 0;
  }

  highlight(index) {
    let self = document.querySelector(".side-panel-option-selector-manager");
    let topCover = document.querySelector(
      ".side-panel-option-selector-manager div:nth-child(1)"
    );
    let highlighter = document.querySelector(
      ".side-panel-option-selector-manager div:nth-child(2)"
    );
    let bottomCover = document.querySelector(
      ".side-panel-option-selector-manager div:nth-child(3)"
    );

    let selfStyle = window.getComputedStyle(self);
    let highlighterStyle = window.getComputedStyle(highlighter);
    highlighter.style.top = `${index * parseInt(highlighterStyle.height)}px`;
    topCover.style.height = `${parseInt(highlighter.style.top)}px`;
    bottomCover.style.height = `${parseInt(selfStyle.height) -
      parseInt(topCover.style.height) -
      parseInt(highlighterStyle.height)}px`;

    this.index = index;
  }

  getCurrentIndex() {
    this.index;
  }
}

let loadImagesToGallery = () => {
  let gallery = document.querySelector(".gallery-option > ul");
  let mainPanelManager = new MainPanelManager();
  let imgWorker = new ImgWorker();
  mainPanelManager.addWorker(imgWorker);

  for (let i = 0; i < 10; i++) {
    fetch("https://picsum.photos/200/300/?random")
      .then(response => {
        let newLi = document.createElement("li");
        let newImg = document.createElement("img");
        newImg.setAttribute("src", `${response.url}`);
        newLi.appendChild(newImg);
        gallery.appendChild(newLi);

        newImg.addEventListener("click", function() {
          let data = {
            url: this.getAttribute("src")
          };

          mainPanelManager.notify(data);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

class MainPanelManager {
  constructor() {
    this.workers = [];
    this.notify = this.notify.bind(this);
  }

  addWorker(worker) {
    this.workers.push(worker);
  }

  notify(data) {
    this.workers.forEach(worker => {
      worker.notify(data);
    });
  }
}

class WorkerBase {
  constructor() {
    this.notify = this.notify.bind(this);
  }

  notify(data) {}
}

class ImgWorker extends WorkerBase {
  constructor() {
    super();
  }

  notify(data) {
    let newImg = document.createElement("img");
    newImg.setAttribute("src", imgUrl);
    let page = document.querySelector(".page");
    page.innerHTML = newImg;
  }
}

let sidePanelOptionSelectorManager = new SidePanelOptionSelectorManager();
let sidePanelContentManager = new SidePanelContentManager(0);
window.onload = () => {
  app();
  sidePanelOptionSelectorManager.highlight(0);
  sidePanelContentManager.showContentOnIndex(0);
  loadImagesToGallery();
};

window.onresize = () => {
  let currentIndex = sidePanelOptionSelectorManager.getCurrentIndex();
  sidePanelOptionSelectorManager.highlight(currentIndex);
  sidePanelContentManager.showContentOnIndex(currentIndex);
};
