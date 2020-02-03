import datepicker from 'js-datepicker';

export default class workWithFields{
    constructor() {
        this.dateInput = document.querySelector('.js-date-input');
        this.minusTicketBtn = document.querySelector('.js-minus-ticket-btn');
        this.plusTicketBtn = document.querySelector('.js-plus-ticket-btn');
        this.numberOfTickets = document.querySelector('.js-number-of-tickets');
    }
    init() {
        this.initDateInput();

        this.dateInput.addEventListener('keydown', (e) => {
            if(!(e.keyCode === 9 || e.keyCode === 13)) e.preventDefault();
        });

        this.minusTicketBtn.addEventListener('click', e => {
            if (this.numberOfTickets.value > 1) {
                this.numberOfTickets.value -= 1;
                this.plusTicketBtn.disabled = false;
                this.calculateTicketPrices();
            } else {
                this.minusTicketBtn.disabled = true;
            }
        });

        this.plusTicketBtn.addEventListener('click', () => {
            if (this.numberOfTickets.value < 50) {
                this.numberOfTickets.value = Number(this.numberOfTickets.value) + 1;
                this.minusTicketBtn.disabled = false;
                this.calculateTicketPrices();
            } else {
                this.plusTicketBtn.disabled = true;
            }
        });
    }

    initDateInput() {
        const date = new Date();
        const month = date.getUTCMonth() + 1;
        const currentMonth = (month.toString().length === 1) ? '0' + month : month;
        const day = date.getUTCDate();
        const tomorrowDay = (day.toString().length === 1) ? '0' + (day + 1) : (day + 1);
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours() + 3;
        const currentHours = (hours.toString().length === 1) ? '0' + hours : hours;
        const minutes = date.getUTCMinutes();
        const currentMinutes = (minutes.toString().length === 1) ? '0' + minutes : minutes;
        const seconds = date.getUTCSeconds();
        const currentSeconds = (seconds.toString().length === 1) ? '0' + seconds : seconds;
        const string = `${year}-${currentMonth}-${tomorrowDay}T${currentHours}:${currentMinutes}:${currentSeconds}`;
        const tomorrowDate = new Date(string);

        datepicker('.js-date-input', {
            respectDisabledReadOnly: true,
            disabled: true,
            formatter: (input, date) => {
                const value = date.toLocaleDateString();
                input.value = value;
            },
            customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            dateSelected: tomorrowDate,
            defaultDate: tomorrowDate,
            minDate: tomorrowDate,
            startDay: 1
        });
    }

    calculateTicketPrices() {
        const countField = document.querySelector('.js-count-of-ticket');
        const sumField = document.querySelector('.js-sum-of-ticket');
        const count = this.numberOfTickets.value;
        const timeField = document.querySelectorAll('.js-choose-time');

        countField.innerText = count;

        if (timeField.length === 1) {
            sumField.innerText = count * 700 + ' рублей'
        } else {
            sumField.innerText = count * 1200 + ' рублей';
        }
    }
}
