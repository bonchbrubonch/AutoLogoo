$(function () {

	// Header menu child toggle
	if ($('.header__has-child span').length) {
		$('.header__has-child span').on('click', function () {
			$(this).toggleClass('open');
			$(this).next().slideToggle();
		});
	}

	// Accordion
	if ($(".accordeon dd").length) {
		$(".accordeon dd").hide().prev().click(function () {
			const $clicked = $(this);
			const $dl = $clicked.closest("dl");

			if ($clicked.hasClass("active")) {
				$dl.removeClass("open");
				$clicked.removeClass("active");
				$clicked.next().slideUp();
				return;
			}

			$clicked
				.parents(".accordeon")
				.find("dd")
				.not($clicked.next())
				.slideUp()
				.prev()
				.removeClass("active");

			$clicked
				.next()
				.not(":visible")
				.slideDown()
				.prev()
				.addClass("active");

			$("dl").removeClass("open");
			$clicked.parent().addClass("open");
		});
	}

	$('.p-item__show-btn').on('click', function (e) {
		e.preventDefault();

		const wrap = $(this).closest('.p-item-wrap'); // знаходимо .p-item-wrap
		const item = wrap.find('.p-item');            // знаходимо .p-item в середині wrap
		const content = wrap.find('.p-item__bot-wrp'); // знаходимо .p-item__bot-wrp

		content.slideToggle(300);    // показати/сховати блок
		item.toggleClass('active');  // перемикаємо клас active
	});

	
});

//
document.querySelectorAll('.pass').forEach(function (el) {
	el.addEventListener('click', function () {
		el.classList.toggle('show');
	});
});



//
document.addEventListener('DOMContentLoaded', function () {
	const filterBtn = document.querySelector('.dss-box__filter-btn');
	const tabWrap = document.querySelector('.dss-tab-wrap');
	const tabClose = document.querySelector('.dss-tab__close');

	if (filterBtn && tabWrap) {
		filterBtn.addEventListener('click', function () {
			tabWrap.classList.add('open');
		});
	}

	if (tabClose && tabWrap) {
		tabClose.addEventListener('click', function () {
			tabWrap.classList.remove('open');
		});
	}
});

//select
document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
	const selected = dropdown.querySelector('.selected');
	const options = dropdown.querySelectorAll('.dropdown-options li');
	const isMulti = dropdown.classList.contains('custom-dropdown-checkbox');
	const placeholder = dropdown.dataset.placeholder;

	if (placeholder !== undefined) {
		selected.textContent = placeholder;
		selected.setAttribute('data-value', '');
		dropdown.classList.remove('selected-has-value');
	} else if (!isMulti && options.length > 0) {
		const first = options[0];
		selected.textContent = first.textContent;
		selected.setAttribute('data-value', first.getAttribute('data-value'));
		dropdown.classList.add('selected-has-value');
	}

	selected.addEventListener('click', () => {
		dropdown.classList.toggle('open');
	});

	options.forEach(option => {
		option.addEventListener('click', (e) => {
			e.stopPropagation();

			if (isMulti) {
				option.classList.toggle('checked');

				const selectedOptions = [...options]
					.filter(opt => opt.classList.contains('checked'))
					.map(opt => opt.textContent.trim());

				const selectedValues = [...options]
					.filter(opt => opt.classList.contains('checked'))
					.map(opt => opt.getAttribute('data-value'));

				if (selectedOptions.length > 0) {
					selected.textContent = selectedOptions.join(', ');
					selected.setAttribute('data-value', selectedValues.join(','));
					dropdown.classList.add('selected-has-value');
				} else {
					// показуємо лише плейсхолдер, якщо він є
					if (placeholder !== undefined) {
						selected.textContent = placeholder;
					} else {
						selected.textContent = '';
					}
					selected.setAttribute('data-value', '');
					dropdown.classList.remove('selected-has-value');
				}
			} else {
				options.forEach(opt => opt.classList.remove('checked'));
				option.classList.add('checked');
				selected.textContent = option.textContent;
				selected.setAttribute('data-value', option.getAttribute('data-value'));
				dropdown.classList.remove('open');
				dropdown.classList.add('selected-has-value');
			}
		});
	});

	document.addEventListener('click', (e) => {
		if (!dropdown.contains(e.target)) {
			dropdown.classList.remove('open');
		}
	});
});




// Search block 1 and block 2
const searchBtn1 = document.querySelector('.header__search');
const form1 = document.querySelector('.underheader__form');

const searchBtn2 = document.querySelector('.announcements__search');
const form2 = document.querySelector('.underheader__form-filter');

document.addEventListener('click', function (e) {
	const clickedInside1 = searchBtn1?.contains(e.target);
	const clickedInsideForm1 = form1?.contains(e.target);

	const clickedInside2 = searchBtn2?.contains(e.target);
	const clickedInsideForm2 = form2?.contains(e.target);

	if (clickedInside1) {
		const isOpen = form1.classList.contains('open');
		form1.classList.toggle('open');
		form2?.classList.remove('open');

		if (!isOpen) document.body.classList.add('dark-bg');
		else document.body.classList.remove('dark-bg');

	} else if (clickedInside2) {
		const isOpen = form2.classList.contains('open');
		form2.classList.toggle('open');
		form1?.classList.remove('open');

		if (!isOpen) document.body.classList.add('dark-bg');
		else document.body.classList.remove('dark-bg');

	} else if (!clickedInsideForm1 && !clickedInsideForm2) {
		document.body.classList.remove('dark-bg');
		form1?.classList.remove('open');
		form2?.classList.remove('open');
	}
});



// Гамбургер-меню
const menuBtn = document.querySelector(".header__menu-btn");
const navMenu = document.querySelector(".header__box");
const header_bg = document.querySelector(".header");

if (menuBtn && navMenu && header_bg) {
	menuBtn.addEventListener("click", function () {
		this.classList.toggle("active");
		navMenu.classList.toggle("open");
		document.body.classList.toggle("lock");
		header_bg.classList.toggle("active");
	});

	const navLinks = navMenu.querySelectorAll("a");
	navLinks.forEach(link => {
		link.addEventListener("click", function () {
			menuBtn.classList.remove("active");
			navMenu.classList.remove("open");
			document.body.classList.remove("lock");
			header_bg.classList.remove("active");
		});
	});
}

// Вкладки (таби)
document.addEventListener("DOMContentLoaded", function () {
	const tabsContainer = document.querySelector(".dss-tab");

	if (tabsContainer) {
		const tabButtons = tabsContainer.querySelectorAll(".dss-tab__btn");
		const tabForms = tabsContainer.querySelectorAll(".form");

		tabForms.forEach((form, index) => {
			form.style.display = index === 0 ? "block" : "none";
		});

		if (tabButtons.length) {
			tabButtons[0].classList.add("active");

			tabButtons.forEach((button, index) => {
				button.addEventListener("click", () => {
					tabButtons.forEach(btn => btn.classList.remove("active"));
					button.classList.add("active");
					tabForms.forEach((form, formIndex) => {
						form.style.display = formIndex === index ? "block" : "none";
					});
				});
			});
		}
	}
});

// Розкриття додаткових полів форми
document.addEventListener("DOMContentLoaded", function () {
	const forms = document.querySelectorAll(".form");

	forms.forEach((form) => {
		const groups = form.querySelectorAll(".form__group");
		const toggleBtn = form.querySelector(".form__show");
		const hiddenClass = "hidden";
		const visibleCount = 4;

		if (!toggleBtn || !groups.length) return;

		function hideExtraFields() {
			groups.forEach((group, index) => {
				if (index >= visibleCount) {
					group.classList.add(hiddenClass);
				}
			});
			toggleBtn.textContent = "Еще параметры";
		}

		function showAllFields() {
			groups.forEach((group) => group.classList.remove(hiddenClass));
			toggleBtn.textContent = "Скрыть параметры";
		}

		hideExtraFields();

		toggleBtn.addEventListener("click", function (e) {
			e.preventDefault();
			const isExpanded = toggleBtn.textContent === "Скрыть параметры";

			if (isExpanded) {
				hideExtraFields();
			} else {
				showAllFields();
			}
		});
	});
});

// Кнопка "додати до обраного"
document.querySelectorAll('.dss-box__item-add').forEach(item => {
	item.addEventListener('click', function () {
		this.classList.toggle('active');
	});
});

// Рейтинг: like/dislike
const like = document.querySelector('.rating__like');
const dislike = document.querySelector('.rating__dislike');

if (like && dislike) {
	like.addEventListener('click', () => {
		like.classList.toggle('active');
		dislike.classList.remove('active');
	});

	dislike.addEventListener('click', () => {
		dislike.classList.toggle('active');
		like.classList.remove('active');
	});
}

// Swiper
if (typeof Swiper !== "undefined") {
	const thumbsSwiper = document.querySelector(".mySwiper");
	const mainSwiper = document.querySelector(".mySwiper2");

	if (thumbsSwiper && mainSwiper) {
		var swiper = new Swiper(".mySwiper", {
			spaceBetween: 10,
			slidesPerView: 5,
			freeMode: true,
			watchSlidesProgress: true,
		});
		var swiper2 = new Swiper(".mySwiper2", {
			spaceBetween: 10,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			thumbs: {
				swiper: swiper,
			},
		});
	}


}

var swiper = new Swiper(".slider-mob", {
	slidesPerView: 1,
	grid: {
		rows: 3,
	},
	spaceBetween: 30,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

