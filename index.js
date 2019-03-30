const app = () => {
	let sidePanelOptions = document.querySelectorAll('.side-panel-option');
	let sidePanelOptionSelector = document.querySelector('.side-panel-option-selector');
	console.log(sidePanelOptions);
	sidePanelOptions.forEach(sidePanelOption => {
		console.log(sidePanelOption);
		sidePanelOption.addEventListener('click', (event) => {
			let currentIndex = parseInt(event.target.getAttribute('index'));
			let sidePanelOptionSelectorStyle = window.getComputedStyle(sidePanelOptionSelector);
			sidePanelOptionSelector.style.top = `${currentIndex * parseInt(sidePanelOptionSelectorStyle.height)}px`;
		});
	});
}

app();