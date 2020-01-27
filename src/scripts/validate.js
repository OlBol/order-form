import errorTemplate from '../templates/error.hbs';

export default function validate(options) {
    const inputs = options.inputs;
    const regexp = {
        phone  : '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'
    };
    const isFieldCorrect = {
        name    : true,
        phone   : true,
        checkbox: true
    };
    const errorMessageEmpty = 'Поле не может быть пустым';
    const errorShortMessage = 'Текст в поле не может быть меньше 2 символов';
    const errorLongNameMessage = 'Текст в поле не может быть превышать 40 символов';
    const errorIncorrectPhoneMessage = 'Номер телефона введен некорректно';

    inputs.forEach((input) => {
        setMode(input);
    });

    function setMode(input) {
        switch (input.name) {
            case 'name':
                validateName(input);
                break;
            case 'phone':
                validatePhone(input);
                break;
            case 'checkbox':
                validateCheckbox(input);
                break;
            default:
                break;
        }
    }

    function validateName(input) {
        if (input.value.length < 2) {
            showErrorMessage(input, errorShortMessage);
        } else if (input.value.length > 40) {
            showErrorMessage(input, errorLongNameMessage);
        } else {
            removeErrorMessage(input);
        }
    }

    function validatePhone(input) {
        const regPhone = new RegExp(regexp.phone, 'u');

        if (!input.value.length) {
            showErrorMessage(input, errorMessageEmpty);
        } else if (!regPhone.test(input.value)) {
            showErrorMessage(input, errorIncorrectPhoneMessage);
        } else {
            removeErrorMessage(input);
        }
    }

    function validateCheckbox(input) {
        if (!input.checked) {
            showErrorMessage(input, errorMessageEmpty);
        } else {
            removeErrorMessage(input);
        }
    }

    function showErrorMessage(input, message) {
        const parent = input.parentElement;
        const html = errorTemplate(message);

        parent.insertAdjacentHTML('afterbegin', html);
        isFieldCorrect[input.name] = false;
    }

    function removeErrorMessage(input) {
        const parent = input.parentElement;
        const errorField = parent.querySelector('.form__error');

        if (errorField) {
            errorField.remove();
            isFieldCorrect[input.name] = true;
        }
    }

    return isFieldCorrect;
}
