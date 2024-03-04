'use strict';

const sliders = document.querySelectorAll('[data-slider]');

const sliderInit = function(currentSlider) {
	let sliderContainer = currentSlider.querySelector('[data-slider-container]');
	const sliderPrevBtn = currentSlider.querySelector('[data-slider-prev]');
	const sliderNextBtn = currentSlider.querySelector('[data-slider-next]');
	const sliderPagination = currentSlider.querySelector(
		'[data-slider-pagination]',
	);
	const sliderPaginationDots = currentSlider.querySelector(
		'[data-slider-pagination-dots]',
	);
	const isAutoPlay = currentSlider.hasAttribute('data-slider-auto-play');

	let totalSliderVisibleItems = Number(
		getComputedStyle(currentSlider).getPropertyValue('--slider-items'),
	);

	let totalSliderItems =
		sliderContainer.childElementCount - totalSliderVisibleItems;

	let currentSlidePos = 0;

	/**
	 * PAGINATION
	 */
	const paginationUpdate = function() {
		if (sliderPagination) {
			sliderPagination.innerHTML = `<span>${currentSlidePos + totalSliderVisibleItems
				}</span> / ${sliderContainer.childElementCount}`;
		} else if (sliderPaginationDots) {
			sliderPaginationDots.innerHTML = '';
			for (let i = 1; i <= sliderContainer.childElementCount; i++) {
				const dot = document.createElement('span');
				dot.classList.add('slider-pagination-dot');

				if (i === currentSlidePos + totalSliderVisibleItems) {
					dot.classList.add('slider-pagination-dot--active');
				}

				sliderPaginationDots.appendChild(dot);
			}
		}
	};

	const resetSliderBtn = function() {
		if (currentSlidePos >= totalSliderItems)
			sliderNextBtn.setAttribute('disabled', '');
		sliderPrevBtn.removeAttribute('disabled');

		if (currentSlidePos <= 0) sliderPrevBtn.setAttribute('disabled', '');
		sliderNextBtn.removeAttribute('disabled');
	};

	/**
	 * NEXT SLIDE
	 */
	const slideNext = function() {
		currentSlidePos++;

		sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;

		if (currentSlidePos >= totalSliderItems)
			sliderNextBtn.setAttribute('disabled', '');
		sliderPrevBtn.removeAttribute('disabled');
		paginationUpdate();
	};

	sliderNextBtn?.addEventListener('click', slideNext);

	/**
	 * PREVIOUS SLIDE
	 */
	const slidePrev = function() {
		currentSlidePos--;

		sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;

		if (currentSlidePos <= 0) sliderPrevBtn.setAttribute('disabled', '');
		sliderNextBtn.removeAttribute('disabled');
		paginationUpdate();
	};

	sliderPrevBtn?.addEventListener('click', slidePrev);

	const dontHaveExtraItem = totalSliderItems <= 0;
	if (dontHaveExtraItem) sliderNextBtn.setAttribute('disabled', '');

	sliderPrevBtn.setAttribute('disabled', '');

	const sliderInterval = setInterval(() => {
		if (isAutoPlay) {
			slideNext();
			if (currentSlidePos >= totalSliderItems) {
				currentSlidePos = -1;
			}
		}
	}, 4000);

	const updateSliderOnResize = function() {
		totalSliderVisibleItems = Number(
			getComputedStyle(currentSlider).getPropertyValue('--slider-items'),
		);

		totalSliderItems =
			sliderContainer.childElementCount - totalSliderVisibleItems;
		currentSlidePos = Math.max(
			0,
			Math.min(currentSlidePos, totalSliderItems - 1),
		);
		sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
		resetSliderBtn();
		paginationUpdate();
	};

	window.addEventListener('resize', updateSliderOnResize);
	resetSliderBtn();
	paginationUpdate(); // Create pagination
};

function initSliders() {
	for (let i = 0, len = sliders.length; i < len; i++) {
		sliderInit(sliders[i]);
	}
}

initSliders();
