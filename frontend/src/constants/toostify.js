import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message) => {
    return new Promise((resolve) => {
        toast(message);
        setTimeout(resolve, 2500);
    });
};
export const errNotify = (message) => {
    return new Promise((resolve) => {
        toast.error(message);
        setTimeout(resolve, 2500);
    });
};