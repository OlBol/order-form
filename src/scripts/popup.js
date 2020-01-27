import popupTemplate from '../templates/popup.hbs';

export default function popup(response) {
    const body = document.body;
    const html = popupTemplate(response);

    body.insertAdjacentHTML('beforeend', html);
    body.style.overflow = 'hidden';

    const popup = document.querySelector('.js-popup');
    const wrapper = popup.querySelector('.js-popup-wrapper');
    const btn = popup.querySelector('.js-close-popup');

    btn.addEventListener('click', () => closePopup());

    popup.addEventListener('click', (event) => {
        const isClickInside = wrapper.contains(event.target);
        if (!isClickInside) closePopup();
    });

    function closePopup() {
        popup.style.display = 'none';
        body.style.overflow = 'auto';
    }
}
