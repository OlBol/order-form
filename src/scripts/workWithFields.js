import datepicker from 'js-datepicker';

export default function workWithFields() {
    const dateInput = document.querySelector('.js-date-input');
    const minusTicketBtn = document.querySelector('.js-minus-ticket-btn');
    const plusTicketBtn = document.querySelector('.js-plus-ticket-btn');
    const numberOfTickets = document.querySelector('.js-number-of-tickets');

    dateInput.addEventListener('keydown', (e) => {
        if(!(e.keyCode === 9 || e.keyCode === 13)) e.preventDefault();
    });

    minusTicketBtn.addEventListener('click', () => {
        if (numberOfTickets.value > 0) {
            numberOfTickets.value -= 1;
            plusTicketBtn.disabled = false;
            calculateTicketPrices();
        } else {
            minusTicketBtn.disabled = true;
        }
    });

    plusTicketBtn.addEventListener('click', () => {
        if (numberOfTickets.value < 50) {
            numberOfTickets.value = parseInt(numberOfTickets.value, 10) + 1;
            minusTicketBtn.disabled = false;
            calculateTicketPrices();
        } else {
            plusTicketBtn.disabled = true;
        }
    });


    function calculateTicketPrices() {
        const countField = document.querySelector('.js-count-of-ticket');
        const sumField = document.querySelector('.js-sum-of-ticket');
        const count = numberOfTickets.value;
        const timeField = document.querySelectorAll('.js-choose-time');

        countField.innerText = count;

        if (timeField.length === 1) {
            sumField.innerText = count * 700 + ' руб за билеты в одну сторону'
        } else {
            sumField.innerText = count * 1200 + ' руб за билеты в обе стороны';
        }
    }

    datepicker('.js-date-input', {
        respectDisabledReadOnly: true,
        disabled: true,
        formatter: (input, date) => {
            const value = date.toLocaleDateString();
            input.value = value;
        },
        customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dateSelected: new Date(),
        startDay: 1
    });
}
