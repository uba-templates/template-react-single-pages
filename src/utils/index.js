import ReactDOM from 'react-dom';
import { Message } from 'tinper-bee';


export const Info = (msg) => {
    Message.create({ content: msg, color : 'success' ,position: 'bottomRight' });
}

export const Error = (msg) => {
    Message.create({ content: msg, color : 'danger' ,position: 'bottomRight' });
}

