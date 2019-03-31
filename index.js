window.onload = () => {
  const app = () => {
    let sidePanelOptions = document.querySelectorAll(".side-panel-option");
    let sidePanelOptionSelectorManager = new SidePanelOptionSelectorManager();

    sidePanelOptions.forEach(sidePanelOption => {
      sidePanelOption.addEventListener("click", event => {
        let currentIndex = parseInt(event.target.getAttribute("index"));
        sidePanelOptionSelectorManager.highlight(currentIndex);
      });
    });
  };

  class SidePanelOptionSelectorManager {
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
      console.log(index);
      highlighter.style.top = `${index * parseInt(highlighterStyle.height)}px`;
      console.log(highlighter.style.top);
      topCover.style.height = `${parseInt(highlighter.style.top)}px`;
      bottomCover.style.height = `${parseInt(selfStyle.height) -
        parseInt(topCover.style.height) -
        parseInt(highlighterStyle.height)}px`;
    }
  }

  app();

  let sidePanelOptionSelectorManager = new SidePanelOptionSelectorManager();
  sidePanelOptionSelectorManager.highlight(0);
};
