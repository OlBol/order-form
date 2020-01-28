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
                const obj = getFormData(formData);

                if (response.ok) {
                    response.json();
                    popup(obj);
                } else {
                    popup(obj);
                }
            })
            .then(() => clearForm())
            .catch(error => {
                const obj = getFormData(formData);
                popup(obj);
            });
    }

    function getFormData(formData) {
        // const date = formData.get('date');
        // const dateArray = date.split('.');
        // const timeToA = formData.get('timeToA');
        // const timeToB = formData.get('timeToB');
        // const dateToA = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${timeToA}:00`);
        // const dateToB = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${timeToB}:00`);
        // const newTimeToA = dateToA.getHours() + 3 + ':' + dateToA.getMinutes();
        // const newTimeToB = dateToB.getHours() + 3 + ':' + dateToB.getMinutes() + '0';

        return {
            "name": formData.get('name'),
            "phone": formData.get('phone'),
            "direction": formData.get('direction'),
            "timeToA": formData.get('timeToA'),
            "timeToB": formData.get('timeToB'),
            "date": formData.get('date'),
            "countOfTickets": formData.get('countOfTickets'),
        };
    }

    function clearForm() {
        inputs.forEach(input => input.value = '');
    }
}
