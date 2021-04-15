import  galleryCards  from '../gallery-items.js';
// Разбей задание на несколько подзадач:

// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2.Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// 3.Открытие модального окна по клику на элементе галереи.
// 4.Подмена значения атрибута src элемента img.lightbox__image.
// 5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6.Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
//     чтобы при следующем открытии модального окна, пока грузится изображение,
//         мы не видели предыдущее.

// Следующий функционал не обязателен при сдаче задания, 
// но будет хорошей практикой по работе с событиями.

// 1.Закрытие модального окна по клику на div.lightbox__overlay.
// 2.Закрытие модального окна по нажатию клавиши ESC.
// 3.Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

const refs = {
  cardsContainer: document.querySelector('ul.js-gallery'),
  galleryMarkup: createGalleryMarkup(galleryCards),
  modalOpen: document.querySelector('.js-lightbox'),
  imgSubstitution: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  closeOverlay: document.querySelector('div.lightbox__overlay'),
  

}

// const cardsContainer = document.querySelector('ul.js-gallery');
// const galleryMarkup = createGalleryMarkup(galleryCards);
// const cardsItem = document.querySelector('.gallery__item');
// const modalOpen = document.querySelector('.js-lightbox')
// const imgSubstitution = document.querySelector('.lightbox__image');
// const closeBtn = document.querySelector('[data-action="close-lightbox"]')


refs.cardsContainer.insertAdjacentHTML('beforeend', refs.galleryMarkup.join(''));
refs.cardsContainer.addEventListener('click', onZoomImage);
refs.closeBtn.addEventListener('click', closeModalByBtn);
refs.closeOverlay.addEventListener('click', closeModalByOverlay);

let activeIndex = null;

function createGalleryMarkup(images) {
    return images.map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    })
    
};

function onZoomImage(evt) {
  evt.preventDefault();
  
  refs.galleryMarkup.forEach((el,ind) => {
      if (el.includes(evt.target.src)) {
        activeIndex = ind;
        return;  
      }      
    });

    if (evt.target.nodeName!=='IMG') {
        return
    }
  refs.modalOpen.classList.add('is-open');
  refs.imgSubstitution.setAttribute('src', `${evt.target.getAttribute('data-source')}`);
  refs.imgSubstitution.setAttribute('alt', `${evt.target.getAttribute('alt')}`)   

  if (refs.modalOpen.classList.contains('is-open')) {
    window.addEventListener("keydown", methodsOnKeyListener)     
  }
  function methodsOnKeyListener(e) {    
    if (e.code === 'ArrowRight') {
      if (activeIndex !== galleryCards.length) {
        activeIndex += 1;
        refs.imgSubstitution.src = galleryCards[activeIndex].original;
        return;
      } else { 
          activeIndex = 0;
          refs.imgSubstitution.src = galleryCards[activeIndex].original;
        return;
      }      
    }    
    if (e.code === 'ArrowLeft' && activeIndex > 0) {
      activeIndex -= 1;
      refs.imgSubstitution.src = galleryCards[activeIndex].original;
      return;
    }    
    if (e.code === 'ArrowLeft' && activeIndex === 0) {
      activeIndex = galleryCards.length -1;
      refs.imgSubstitution.src = galleryCards[activeIndex].original;
      return;
    }    
   if (e.code === 'Escape') {
      refs.modalOpen.classList.remove('is-open');
      refs.imgSubstitution.setAttribute('src', '');
      window.removeEventListener("keydown", methodsOnKeyListener)
    };
  };
};

function closeModalByBtn(e) {
  if (e.target.nodeName!=='BUTTON') {
        return
  }
   
  
  refs.modalOpen.classList.remove('is-open');
  refs.imgSubstitution.setAttribute('src', '');

};

function closeModalByOverlay(e) {
// console.log(e.target);
  refs.modalOpen.classList.remove('is-open');
  refs.imgSubstitution.setAttribute('src', '');
};




