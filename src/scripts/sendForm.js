import Inputmask from 'inputmask';
import validate from './validate';
import popup from './popup';

export default function sendForm() {
    const phoneMask = '+7 999 99-99-99';
    const form = document.querySelector('.js-form');
    const inputs = form.querySelectorAll('.js-input');

    inputs.forEach((input) => {
        if (input.name === 'phone') putPhoneMask(input);

    });

    function putPhoneMask(input) {
        const inputmask = new Inputmask({
            'mask': phoneMask,
            showMaskOnHover: false
        });

        inputmask.mask(input);
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        let result = true;

        const valResult = validate({
            inputs: inputs
        });

        for (const field in valResult) {
            if (valResult[field] === false) result = false;
        }

        if (result === true) submitForm();
    });

    function submitForm() {
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            headers: { 'X-Requested-With':'XMLHttpRequest' },
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    response.json();
                    popup(formData);
                } else {
                    popup({
                        "name": formData.get('name'),
                        "phone": formData.get('phone'),
                        "direction": formData.get('direction'),
                        "timeToA": formData.get('timeToA'),
                        "timeToB": formData.get('timeToB'),
                        "date": formData.get('date'),
                        "countOfTickets": formData.get('countOfTickets'),
                    });
                }
            })
            .then(() => clearForm())
            .catch(error => {
                popup(error);
            });
    }

    function clearForm() {
        inputs.forEach(input => input.value = '');
    }
}
