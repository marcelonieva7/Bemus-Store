import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSigninCheck } from 'reactfire';
import SignIn from '../SignIn/SignIn';

const ProtectRoute = ({children}) => {
    const { status, data: signinResult } = useSigninCheck();
    const { signedIn, user } = signinResult || {signedIn: false, user: []}

    const cloneChildren = React.cloneElement(
        children,
        {user: user}
    )

    return (
        status === 'loading' ? <Skeleton/> : (signedIn ? cloneChildren : <SignIn/>)
    );
}
 
export default ProtectRoute;