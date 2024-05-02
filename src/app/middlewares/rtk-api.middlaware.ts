import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI } from "@reduxjs/toolkit";
import { setOverlay } from '../../common/features/common.slice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { HttpStatus } from '../../common/constants/common.constants';

/**
 * 
* const ErrorBoundary = () => {
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.someSlice.error);

  useEffect(() => {
    if (error && error.status === 401) {
      navigate('/401');
    }
  }, [error, navigate]);

  return null; // This component doesn't render anything visible
};

export default ErrorBoundary;
 */

export const rtkQueryMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action: any) => {
    const navigate = useNavigate();
    const { dispatch } = api;

    if (isRejectedWithValue(action)) {
        console.error('Error:', action.payload);
        dispatch(setOverlay(false));

        // if(action.payload.data.code === HttpStatus.UNAUTHORIZED) {
            
        // }

        toast.error(action.payload.data.message);
    }

    if (action.type.endsWith('/pending')) {
        dispatch(setOverlay(true));
    }

    if (action.type.endsWith('/fulfilled')) {
        dispatch(setOverlay(false));
    }

    return next(action);
};