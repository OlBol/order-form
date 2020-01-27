import selectTemplate from '../templates/select.hbs';
import data from '../time.json';

export default function addTimeTemplate() {
    const chooseDirectionWrapper = document.querySelector('.js-direction-wrapper');
    const chooseDirectionField = document.querySelector('.js-choose-direction');

    chooseDirectionField.addEventListener('input', () => {
        chooseTimeGroup();
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
            for (const item of direction.split(" ")) {
                insertTimeOptions(data[item]);
            }
        } else {
            insertTimeOptions(data[direction]);
        }
    }

    function insertTimeOptions(direction) {
        const html = selectTemplate(direction);
        chooseDirectionWrapper.insertAdjacentHTML('afterend', html);
        const select = document.querySelector(`.js-choose-time-group[data-time-group='${direction.direction}']`);

        select.addEventListener('input', () => {

        });
    }

    chooseTimeGroup();
}
