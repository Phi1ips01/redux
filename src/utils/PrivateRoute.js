import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { ROUTES } from '../Routes.constants';
import { CommonUtils } from './commonUtils';

const PrivateRoute = ({ element: Element, ...rest }) => {
    return (
        <Route
            {...rest}
            element={CommonUtils.isLoggedIn() ? <Element /> : <Navigate to={ROUTES.LOGIN} replace />}
        />
    );
};

export default PrivateRoute;
