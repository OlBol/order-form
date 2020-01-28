import WorkWithFields from '../scripts/workWithFields';
import selectTemplate from '../templates/select.hbs';
import data from '../time.json';

export default function addTimeTemplate() {
    const chooseDirectionWrapper = document.querySelector('.js-direction-wrapper');
    const chooseDirectionField = document.querySelector('.js-choose-direction');
    let flag = 1;
    const workWithFields = new WorkWithFields;

    chooseDirectionField.addEventListener('input', () => {
        chooseTimeGroup();
        workWithFields.calculateTicketPrices();
    });

    function chooseTimeGroup() {
        let direction;
        const timeGroup = document.querySelectorAll('.js-choose-time-group');

        for (const group of timeGroup) {
            group.remove();
        }

        for (const option of chooseDirectionField.options) {
            if (option.selected) {
                direction = option.dataset.direction;
            }
        }

        if (direction.split(" ").length > 1) {
            flag = 2;

            for (const item of direction.split(" ")) {
                insertTimeOptions(data[item]);
            }

            const select = document.querySelectorAll(`.js-choose-time-group[data-time-group] select`);

            changeTimeRange(select[0], select[1]);
        } else {
            flag = 1;

            insertTimeOptions(data[direction]);
        }
    }

    function insertTimeOptions(direction) {
        const html = selectTemplate(direction);
        chooseDirectionWrapper.insertAdjacentHTML('afterend', html);
    }

    function changeTimeRange(timeFrom, timeTo) {
        timeFrom.addEventListener('input', ()=> {

            for (const item of timeTo.options) {
                item.style.display = 'block';

                if (timeFrom.value > item.value) {
                    item.style.display = 'none';
                }
            }
        });
    }

    chooseTimeGroup();
}
