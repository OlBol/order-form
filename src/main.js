import './styles/main.css';
import './styles/datepicker.min.css';

import sendForm from './scripts/sendForm';
import addTimeTemplate from './scripts/addTimeTemplate';
import WorkWithFields from './scripts/workWithFields';

const workWithFields = new WorkWithFields();
workWithFields.init();

addTimeTemplate();
sendForm();
