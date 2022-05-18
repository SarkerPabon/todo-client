import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loader from "../Pages/Share/Loader";
import SocialLogin from "./SocialLogin";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formError, setFormError] = useState({
		lengthError: "",
		passwordResetError: "",
	});

	const location = useLocation();

	let from = location.state?.from?.pathname || "/";

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	if (loading) {
		return <Loader />;
	}

	let errorMessage;
	if (error) {
		// console.log(error);
		errorMessage = (
			<div id='password' className='form-text text-danger my-3'>
				{error.message}
			</div>
		);
	}

	if (user) {
		// console.log("Login User: ", user);
		return <Navigate to={from} replace={true} />;
	}

	const handleSubmit = (e) => {
		// console.log("submit");
		e.preventDefault();

		if (password.length < 6) {
			setFormError({ lengthError: "Password length must be six or longer" });
			return;
		}

		// console.log(email, password);
		signInWithEmailAndPassword(email, password)
			.then(() => toast.success("Login Successful", { toastId: "user-login" }))
			.catch((error) => console.log(error));
	};

	return (
		<div className='container my-5'>
			<h1 className='text-center text-secondary my-3'>Login</h1>
			<div className='row justify-content-center align-items-center'>
				<div className='col-md-6 col-sm-12'>
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<input
								type='email'
								className='form-control'
								name='email'
								id='email'
								placeholder='Enter Your Email Address'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className='mb-3'>
							<input
								type='password'
								className='form-control'
								name='password'
								id='password'
								placeholder='Enter Your Password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{formError.lengthError ? (
								<div id='password' className='form-text text-danger'>
									{formError.lengthError}
								</div>
							) : (
								<div id='password' className='form-text text-secondary '>
									Password length must be six characters or longer
								</div>
							)}
						</div>
						{errorMessage}
						<div className='d-flex justify-content-between '>
							<p>
								Are you new?{" "}
								<Link
									to='/register'
									className='mt-2 text-decoration-none text-muted text-decoration-underline'
								>
									Go Registration
								</Link>
							</p>
						</div>
						<button type='submit' className='btn btn-secondary mt-3'>
							Login
						</button>
					</form>
					<SocialLogin />
				</div>
			</div>
		</div>
	);
};

export default Login;
