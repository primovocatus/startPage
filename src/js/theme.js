let currentIndex = localStorage.getItem("currentIndex") || document.currentScript.getAttribute('currentIndex');
currentIndex = parseInt(currentIndex);

const images = ["cover4.jpg", "cover5.jpg"];
const colorSets = [
	{
		"--text-color": "#aab9d9",
		"--hover-color": "#e88888",
		"--accent-color": "#ffffff",
		"--accent-color-2": "#7f6bc7",
		"--background-color": "#1a1b26",
	},
	{
		"--text-color": "#b3ae9d",
		"--hover-color": "#8e100f",
		"--accent-color": "#FCD0CC",
		"--accent-color-2": "#cf4217",
		"--background-color": "#1a1b26",
	},
];

function preloadImages() {
	for (let i = 0; i < images.length; i++) {
		const img = new Image();
		img.src = "src/images/" + images[i];
	}
}

function nextImage() {
	currentIndex = (currentIndex + 1) % images.length;
	localStorage.setItem("currentIndex", currentIndex); // Update currentIndex in localStorage
	const imageElement = document.getElementById("carouselImage");
	imageElement.style.opacity = 0;
	updateColors(currentIndex);

	setTimeout(() => {
		imageElement.src = "src/images/" + images[currentIndex];
		imageElement.style.opacity = 1;
	}, 200); // Match the transition duration in style.css
}

function updateColors() {
	const colorSet = colorSets[currentIndex];
	// Iterate through the colorSet and set the CSS variables
	for (const [property, value] of Object.entries(colorSet)) {
		document.documentElement.style.setProperty(property, value);
	}
}

// Set colors with current index first
updateColors(currentIndex);

// Set the initial image
document.getElementById("carouselImage").src = "src/images/" + images[currentIndex];

// Image is opacity 0 and text is translated off screen by default
// Add the loaded class to the image and text to animate them in
window.onload = function() {
	document.getElementById("image").classList.add('loaded');
	document.getElementById("text").classList.add('loaded');
	// Preload the remaining images
	preloadImages();
};
