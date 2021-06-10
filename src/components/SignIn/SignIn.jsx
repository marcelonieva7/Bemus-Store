import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase/app";
import { useAuth } from 'reactfire';

const SignIn = () => {
    const auth = useAuth();

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false
        }
      };
    
    return (
        <div className="pt-28">
          <h1 className="text-center mb-4 text-lg">Crea una cuenta o inicia sesion</h1>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      );
}
 
export default SignIn;