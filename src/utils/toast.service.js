import { toast } from 'react-toastify';

const error = (message) => {
  toast.error(`${message}`, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const success = () => {
  toast.success('Success', {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const toastService = {
  error,
  success,
};

export default toastService;
