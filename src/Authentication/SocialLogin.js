import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import google from "../images/social/google.png";
import Loader from "../Pages/Share/Loader";

const SocialLogin = () => {
	const [signInWithGoogle, googleUser, googleLoading, googleError] =
		useSignInWithGoogle(auth);

	const location = useLocation();

	let from = location.state?.from?.pathname || "/";

	if (googleUser) {
		/* 		const email = googleUser.user.email;
		console.log("Google User Email: ", email); */
		// console.log(googleUser);

		return <Navigate to={from} replace={true} />;
	}

	let errorElement;
	if (googleError) {
		errorElement = <p className='text-danger'>Error: {googleError?.message}</p>;
	}

	if (googleLoading) {
		return <Loader />;
	}

	return (
		<div className='my-3'>
			<div className='d-flex justify-content-center'>
				<div
					style={{ height: "1px", width: "40%" }}
					className='bg-secondary mt-3 mx-3'
				></div>
				<p className='fs-5'>OR</p>
				<div
					style={{ height: "1px", width: "40%" }}
					className='bg-secondary mt-3 mx-3'
				></div>
			</div>
			<div
				onClick={() => signInWithGoogle()}
				className='d-flex justify-content-center'
			>
				<button className='btn btn-light d-block border border-secondary'>
					<img src={google} alt='Googel' height='30px' />
					<span className='px-2'>Continue with Google</span>
				</button>
			</div>
			{errorElement}
		</div>
	);
};

export default SocialLogin;
