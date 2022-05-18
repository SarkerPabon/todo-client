import axios from "axios";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loader from "../Share/Loader";

const AddTask = () => {
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	if (loading) {
		return <Loader />;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const task = { name, description, email: user.email, completed: false };

		console.log(task);

		axios
			.post("http://localhost:5000/tasks", { ...task })
			.then((response) => {
				// console.log(response);
				toast.success("Add Task Successfully", { toastId: "add_task" });
				navigate("/products");
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className='container my-5 border broder-secondary'>
			<div className='row justify-content-center'>
				<div className='col-sm-12 col-md-6'>
					<h1 className='text-center text-secondary my-3'>Add Product</h1>
					<form onSubmit={handleSubmit}>
						<div className='form-floating mb-3'>
							<input
								type='text'
								className='form-control'
								name='name'
								id='name'
								placeholder='Enter Task Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
							<label htmlFor='name' className='form-label'>
								Task Name
							</label>
						</div>
						<div className='form-floating mb-3'>
							<textarea
								name='description'
								id='description'
								className='form-control'
								placeholder='Please give a task description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								style={{ height: "100px" }}
							></textarea>
							<label htmlFor='description'>Task Description</label>
						</div>
						<button type='submit' className='btn btn-secondary'>
							Add Task
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddTask;
