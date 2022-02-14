window.addEventListener('DOMContentLoaded', function() {

  // NAVIGATION SCROLL

  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    });
  };

  // DROPDOWN MENU

  const menuBtn = document.querySelectorAll('.menu__btn');
  const dropdown = document.querySelectorAll('.dropdown')

  menuBtn.forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.currentTarget.classList.contains('menu__btn--active')) {
        e.currentTarget.classList.remove('menu__btn--active');
        e.currentTarget.closest('li').querySelector('.dropdown').classList.remove('dropdown--active');
      } else {
        menuBtn.forEach(el => {el.classList.remove(('menu__btn--active'))});
        e.currentTarget.classList.add('menu__btn--active');
        dropdown.forEach(el => {el.classList.remove(('dropdown--active'))})
        e.currentTarget.closest('li').querySelector('.dropdown').classList.add('dropdown--active');
      };
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('dropdown') && !e.target.classList.contains('menu__btn')) {
      menuBtn.forEach(el => {el.classList.remove(('menu__btn--active'))});
      dropdown.forEach(el => {el.classList.remove(('dropdown--active'))})
    }
  });


  // MOBILE MENU

  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.overlay');
  const navigation = document.querySelector('.nav');
  const navLink  = document.querySelectorAll('.nav__link');

  let fixBlocks = document.querySelectorAll('.fix-block');

  const lockScroll = () => {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.classList.add('lock');
    fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  };

  const unlockScroll = () => {
    document.body.classList.remove('lock');
    fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  };

  burger.addEventListener('click', (e) => {
    if (e.target.classList.contains('burger-close')) {
      burger.classList.remove('burger-close');
      burger.setAttribute('aria-label', 'Открыть меню.');
      overlay.classList.remove('overlay--visible');
      navigation.classList.remove('nav--active');
      unlockScroll();
    } else {
      burger.classList.add('burger-close');
      burger.setAttribute('aria-label', 'Закрыть меню.');
      overlay.classList.add('overlay--visible');
      navigation.classList.add('nav--active');
      lockScroll();
    };
  });

  navLink.forEach((el) => {
    el.addEventListener('click', () => {
      burger.classList.remove('burger-close');
      burger.setAttribute('aria-label', 'Открыть меню.');
      overlay.classList.remove('overlay--visible');
      navigation.classList.remove('nav--active');
      unlockScroll();
    })
  })


  // MOBILE SEARCH

  const searchControl = document.querySelector('.search-control');
  const search = document.querySelector('.header__search--mobile');

  searchControl.addEventListener('click', () => {
    searchControl.classList.toggle('search-control--active');
    if (searchControl.classList.contains('search-control--active')) {
      searchControl.setAttribute('aria-label', 'Закрыть форму поиска по сайту.')
    } else {
      searchControl.setAttribute('aria-label', 'Открыть форму поиска по сайту.')
    }
    search.classList.toggle('search-open');
  });


  // SELECT

  const select = () => {
    const element = document.querySelector('.select__body');
    const choices = new Choices(element, {
      searchEnabled: false,
      position: 'bottom',
    });
  };

  select();

  const selectBlock = document.querySelector('.select');
  const choicesBtn = document.querySelector('.choices');

  choicesBtn.addEventListener('click', () => {
    if (choicesBtn.classList.contains('is-open')) {
      selectBlock.style.height = '82px';
    } else {
      selectBlock.style.height = '170px';
    };
  });

  // SWIPER

  const swiperGallery = new Swiper('.gallery-slider', {
    loop: false,
    wrapperClass: 'gallery-slider__wrapper',
    lazy: {
      loadPrevNext: true,
    },
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.gallery-slider__btn--next',
      prevEl: '.gallery-slider__btn--prev',
      disabledClass: 'gallery-slider__btn--disable',
    },
    pagination: {
      el: '.gallery-slider__pagination',
      type: 'fraction',
    },
    a11y: {
      firstSlideMessage: 'Это первый слайд.',
      lastSlideMessage: 'Это последний слайд.',
      nextSlideMessage: 'Следующий слайд.',
      prevSlideMessage: 'Предыдущий слайд.',
      slideLabelMessage: '{{index}} из {{slidesLength}}',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      320: {
        grid: {
          rows: 1,
        },
        slidesPerGroup: 1,
        slidesPerView: 1,
      },

      576: {
        grid: {
          rows: 1,
        },
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 30,
      },

      768: {
        grid: {
          rows: 2,
        },
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },

      1025: {
        grid: {
          rows: 2,
        },
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },

      1200: {
        grid: {
          rows: 2,
        },
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50,
      },

    },
  });

  const slider = document.querySelector('.events-slider');
  let swiperEvents;

  function mobileSlider() {
    if (window.innerWidth <= 767 && slider.dataset.mobile == 'false') {
      swiperEvents = new Swiper(slider, {
        loop: true,
        watchSlidesProgress: true,
        wrapperClass: 'events-list',
        slideClass: 'events-list__item',
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        a11y: {
          firstSlideMessage: 'Это первый слайд.',
          lastSlideMessage: 'Это последний слайд.',
          nextSlideMessage: 'Следующий слайд.',
          prevSlideMessage: 'Предыдущий слайд.',
          slideLabelMessage: '{{index}} из {{slidesLength}}',
          paginationBulletMessage: 'Перейти к слайду номер {{index}}',
        },
        pagination: {
          el: '.events-slider__pagination',
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerGroup: 1,
            slidesPerView: 1,
            spaceBetween: 15,
          },

          576: {
            slidesPerGroup: 1,
            slidesPerView: 2,
            spaceBetween: 15,
          },
        },
      });

      slider.dataset.mobile = 'true';
    };

    if (window.innerWidth > 767) {
      slider.dataset.mobile = 'false';
      if (slider.classList.contains('swiper-initialized')) {
        swiperEvents.destroy();
      };
    };
  };

  mobileSlider();

  window.addEventListener('resize', () => {
    mobileSlider();
  });

  const swiperPublications = document.querySelector('.publications-slider__container');
  let sliderPublications;

  function publicationsSlider() {
    if (window.innerWidth > 767 && swiperPublications.dataset.mobile == 'false') {
      sliderPublications = new Swiper(swiperPublications, {
        loop: false,
        lazy: {
          loadPrevNext: true,
        },
        watchSlidesProgress: true,
        wrapperClass: 'publications-slider__wrapper',
        navigation: {
          nextEl: '.publications-slider__btn--next',
          prevEl: '.publications-slider__btn--prev',
          disabledClass: 'publications-slider__btn--disable',
        },
        pagination: {
          el: '.publications-slider__pagination',
          type: 'fraction',
        },
        a11y: {
          firstSlideMessage: 'Это первый слайд.',
          lastSlideMessage: 'Это последний слайд.',
          nextSlideMessage: 'Следующий слайд.',
          prevSlideMessage: 'Предыдущий слайд.',
          slideLabelMessage: '{{index}} из {{slidesLength}}',
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        breakpoints: {
          768: {
            slidesPerGroup: 2,
            slidesPerView: 2,
            spaceBetween: 34,
          },

          1024: {
            slidesPerGroup: 2,
            slidesPerView: 2,
            spaceBetween: 50,
          },

          1200: {
            slidesPerGroup: 3,
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
      });

      swiperPublications.dataset.mobile = 'true';
    };

    if (window.innerWidth <= 767) {
      swiperPublications.dataset.mobile = 'false';
      if (swiperPublications.classList.contains('swiper-initialized')) {
        sliderPublications.destroy();
      };
    };
  };

  publicationsSlider();

  window.addEventListener('resize', () => {
    publicationsSlider();
  });

  const swiperPartners = new Swiper('.partners-slider__container', {
    loop: false,
    lazy: {
      loadPrevNext: true,
    },
    watchSlidesProgress: true,
    wrapperClass: 'partners-slider__wrapper',
    navigation: {
      nextEl: '.partners-slider__btn--next',
      prevEl: '.partners-slider__btn--prev',
      disabledClass: 'partners-slider__btn--disabled',
    },
    a11y: {
      firstSlideMessage: 'Это первый слайд.',
      lastSlideMessage: 'Это последний слайд.',
      nextSlideMessage: 'Следующий слайд.',
      prevSlideMessage: 'Предыдущий слайд.',
      slideLabelMessage: '{{index}} из {{slidesLength}}',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      320: {
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 17,
      },

      768: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },

      992: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 50,
      },

      1200: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });

  // MODALS

  const slidesBtn = document.querySelectorAll('.slide-gallery__btn');
  const modalOverlay = document.querySelector('.modals__overlay');
  const modals = document.querySelectorAll('.modal-card');
  const btnClose = document.querySelectorAll('.modal-card__btn');

  slidesBtn.forEach((el) => {
    el.addEventListener('click', (e) => {
      let modalPath = e.currentTarget.getAttribute('data-modals-path');

      modals.forEach((el) => {
        el.classList.remove('modal-card--visible');
      });

      document.querySelector(`[data-modals-target="${modalPath}"]`).classList.add('modal-card--visible');
		  modalOverlay.classList.add('modals__overlay--visible');
      lockScroll();
    });
  });

  btnClose.forEach((el) => {
    el.addEventListener('click', (e) => {
      modals.forEach((el) => {
        el.classList.remove('modal-card--visible');
      });
      modalOverlay.classList.remove('modals__overlay--visible');
      unlockScroll();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') {
      modals.forEach((el) => {
        el.classList.remove('modal-card--visible');
      });
      modalOverlay.classList.remove('modals__overlay--visible');
      unlockScroll();
    };
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target == modalOverlay) {
      modals.forEach((el) => {
        el.classList.remove('modal-card--visible');
      });
      modalOverlay.classList.remove('modals__overlay--visible');
      unlockScroll();
    };
  });

  //FadeIn FadeOut

  const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.visibility = 'hidden';
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms, visibility ${timeout}ms`;
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.visibility = 'visible';
    }, 500);
  };

  const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.visibility = 'visible';
    el.style.transition = `opacity ${timeout}ms, visibility ${timeout}ms`;
    el.style.opacity = 0;
    el.style.visibility = 'hidden';
    setTimeout(() => {
      el.style.display = 'none';
    }, timeout);
  };

  //TABS

  const tabsCountryBtn = document.querySelectorAll('.country-list__btn');
  const tabsCountryContent = document.querySelectorAll('.tabs-content');

  tabsCountryBtn.forEach(el => {
    el.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const tabsCountryPath = self.dataset.countryPath;

      tabsCountryBtn.forEach(el => {el.classList.remove('country-list__btn--active')});
      document.querySelector(`[data-country-path="${tabsCountryPath}"]`).classList.add('country-list__btn--active');
      tabsCountryHandler(tabsCountryPath);
      tabsCountryContent.forEach(el => {
        if (el.classList.contains('tabs-content--active')) {
          fadeIn(el, 2000, 'block');
        } else {
          fadeOut(el, 500);
        };
      });

      document.querySelectorAll('.accordion__content').forEach(el => {
        if (el.classList.contains('accordion__content--active')) {
          el.style.maxHeight = el.scrollHeight + 'px';
        };
      });
    });
  });

  const tabsCountryHandler = (path) => {
    tabsCountryContent.forEach(el => {el.classList.remove('tabs-content--active')});
    document.querySelector(`[data-country-target="${path}"]`).classList.add('tabs-content--active');
    const tabsCountryContentActive = document.querySelector('.tabs-content--active');
    const accordions = tabsCountryContentActive.querySelectorAll('.accordion');
    const accordionControls = tabsCountryContentActive.querySelectorAll('.accordion__control');
    const accordionContent = tabsCountryContentActive.querySelectorAll('.accordion__content');
    const cardArtist = tabsCountryContentActive.querySelectorAll('.content__artist-card');
    const artistBtns = tabsCountryContentActive.querySelectorAll('.artist-list__btn');
    accordions.forEach(el => {el.classList.remove('accordion--open')});
    accordions[0].classList.add('accordion--open');
    accordionControls.forEach(el => {el.classList.remove('accordion__control--active')});
    accordionControls[0].classList.add('accordion__control--active');
    accordionContent.forEach(el => {el.classList.remove('accordion__content--active')});
    accordionContent[0].classList.add('accordion__content--active');
    cardArtist.forEach(el => {el.classList.remove('content__artist-card--active')});
    cardArtist[0].classList.add('content__artist-card--active');
    fadeIn(cardArtist[0], 1000, 'block');
    artistBtns.forEach(el => {el.classList.remove('artist-list__btn--active')});
    artistBtns[0].classList.add('artist-list__btn--active');
  };

  const tabsArtistBtn = document.querySelectorAll('.artist-list__btn');
  const tabsArtistContent = document.querySelectorAll('.content__artist-card');

  tabsArtistBtn.forEach(el => {
    el.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const tabsArtistPath = self.dataset.artistPath;

      tabsArtistBtn.forEach(el => {el.classList.remove('artist-list__btn--active')});
      document.querySelector(`[data-artist-path="${tabsArtistPath}"]`).classList.add('artist-list__btn--active');
      tabsArtistHandler(tabsArtistPath);

      tabsArtistContent.forEach(el => {
        if (el.classList.contains('content__artist-card--active')) {
          fadeIn(el, 1000, 'block');
          if (window.innerWidth < 1025) {
            setTimeout(() => el.scrollIntoView({block: 'start', behavior: 'smooth'}), 500);
          };
        } else {
          fadeOut(el, 500);
        };
      });
    });
  });

  const tabsArtistHandler = (path) => {
    tabsArtistContent.forEach(el => {el.classList.remove('content__artist-card--active')});
    document.querySelector(`[data-artist-target="${path}"]`).classList.add('content__artist-card--active');
  };


  //ACCORDION

  const accordionControl = document.querySelectorAll('.accordion__control');
  const accordionContent = document.querySelectorAll('.accordion__content');

  accordionControl.forEach(el => {
    el.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const content = self.closest('li').querySelector('.accordion__content');

      accordionControl.forEach(el => {
        el.classList.remove('accordion__control--active');
        el.setAttribute('aria-expanded', false);
        el.closest('li').classList.remove('accordion--open');
      });
      accordionContent.forEach(el => {
        el.classList.remove('accordion__content--active');
        el.setAttribute('aria-hidden', true);
        el.style.maxHeight = null;
      });
      self.classList.toggle('accordion__control--active');
      self.closest('li').classList.toggle('accordion--open');
      content.classList.toggle('accordion__content--active');

      if (self.classList.contains('accordion__control--active')) {
        self.setAttribute('aria-expanded', true);
      } else {
        self.setAttribute('aria-expanded', false);
      };

      if (content.classList.contains('accordion__content--active')) {
        content.setAttribute('aria-hidden', false);
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.setAttribute('aria-hidden', true);
        content.style.maxHeight = null;
      };
    });
  });

  accordionContent.forEach(el => {
    if (el.classList.contains('accordion__content--active')) {
      el.style.maxHeight = el.scrollHeight + 'px';
    };
  });

  // SHOW MORE

  const eventItem = document.querySelectorAll('.events-list__item');
  const eventBtn = document.querySelector('.events__btn');
  const eventBtnWrap = document.querySelector('.events__btn-wrapper');

  eventBtn.addEventListener('click', () => {
    eventItem.forEach(el => {
      el.style.display = 'flex'
    });
    eventBtnWrap.style.display="none";
  });

  // PUBLICATION's CHECKBOXES MOBILE

  const checkboxBtn = document.querySelector('.checkboxes__btn');
  const checkboxes = document.querySelectorAll('.custom-checkbox');

  checkboxBtn.addEventListener('click', () => {
    if (!checkboxBtn.classList.contains('checkboxes__title--open')) {
      checkboxBtn.setAttribute('aria-label', 'Нажмите чтобы скрыть список категорий.');
      checkboxes.forEach(el => {
        el.classList.add('open');
        el.classList.remove('checked');
      });
      checkboxBtn.classList.add('checkboxes__title--open');
    } else {
      checkboxBtn.setAttribute('aria-label', 'Нажмите чтобы открыть список категорий.');
      checkboxes.forEach(el => {
        el.classList.remove('open');
        if (el.querySelector('input').checked) {
          el.classList.add('open');
          el.classList.add('checked');
        };
      });
      checkboxBtn.classList.remove('checkboxes__title--open');
    };
  });

  checkboxes.forEach((el) => {
    el.addEventListener('click', () => {
      if (el.classList.contains('checked') && !checkboxBtn.classList.contains('checkboxes__title--open')) {
        el.classList.remove('checked');
        el.classList.remove('open');
      };
    });
  });

  // TOOLTIPS

  tippy('.tooltip', {
    content: 'Global content',
    theme: 'main-color',
    maxWidth: 264,
    offset: [0, 13],
    trigger: 'click',
  });

  // INPUTMASK

  var selector = document.querySelector("input[type='tel']");

  var im = new Inputmask("+7 (999) 999-99-99", { showMaskOnHover: false });
  im.mask(selector);

  // JUST-VALIDATE

  new JustValidate('.js-form', {
    colorWrong: '#D11616',
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
        strength: {
          custom: '[А-Я][А-Яа-я -]'
        },
      },

      phone: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        },
      },
    },

    messages: {
      name: {
        required: 'Обязательное поле',
        minLength: 'Недопустимый формат',
        maxLength: 'Недопустимый формат',
        strength: 'Недопустимый формат',
      },
      phone: {
        required: 'Обязательное поле',
        function: 'Недопустимый формат',
      },
    },

    submitHandler: function (form) {

      let formData = new FormData(form);

			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('Отправлено');
					}
				}
			}

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			form.reset();
    },

  });

  // YANDEX-MAPS

  ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [55.75846806898367, 37.60108849999989],
            controls: ['geolocationControl', 'zoomControl'],
            zoom: 14
        }, {
          // Зададим опции для элементов управления.
          geolocationControlFloat: 'right',
          zoomControlSize: 'small',
          zoomControlFloat: 'none',
          zoomControlPosition: {
            top: 50,
            right: 10,
          }
      });

        geolocationControlObj = myMap.controls.get('geolocationControl');
        zoomControlObj = myMap.controls.get('zoomControl');

        var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
          iconLayout: 'default#image',
          iconImageHref: './img/contacts/map-mark.svg',
          iconImageSize: [20, 20],
          iconImageOffset: [0, 0]
      });

      myMap.controls.add('geolocationControl', {
        float: 'right',
      });
      myMap.controls.add('zoomControl', {
        size: 'small',
        float: 'none',
        position: {
          top: 0,
          right: 0,
        }
      });

      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myPlacemark);
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('typeSelector');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      myMap.controls.remove('routeButtonControl');
    }

})
