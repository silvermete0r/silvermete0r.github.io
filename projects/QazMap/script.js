const tooltip = document.querySelector('.tooltip');
const regions = document.querySelectorAll('.region');
const popupBg = document.querySelector('.info_bg');
const popup = document.querySelector('.info');

regions.forEach(region => {
	region.addEventListener('click', function() {
		popup.querySelector('.info_photo').setAttribute('src', this.dataset.photo);
		popup.querySelector('.info_title').innerText = this.dataset.title;
		popup.querySelector('.info_text').innerText = this.dataset.description;
		popup.querySelector('.btn').setAttribute('href', this.dataset.link);
		popupBg.classList.add('active');
	});

	region.addEventListener('mousemove', function(e) {
		tooltip.innerText = this.dataset.title;
		tooltip.style.top = (e.y + 17) + 'px';
		tooltip.style.left = (e.x + 17) + 'px';
	});

	region.addEventListener('mouseenter', function() {
		tooltip.style.display = 'block';
	});

	region.addEventListener('mouseleave', function() {
		tooltip.style.display = 'none';
	});
});

document.addEventListener('click', (e) => {
	if(e.target === popupBg) {
		popupBg.classList.remove('active');
	}
});