import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [user] = useAuthState(auth);
	const email = user.email;

	useEffect(() => {
		axios
			.get(`http://localhost:5000/tasks?email=${email}`)
			.then((response) => {
				setTasks(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [tasks]);

	// Update
	const handleComplete = (_id, completed) => {
		axios
			.patch(`https://todos-hero.herokuapp.com/tasks/${_id}`, {
				completed: !completed,
			})
			.then((response) => console.log(response))
			.catch((error) => console.log(error));
	};

	// Delete
	const handleDelete = (_id, name) => {
		const confirmation = window.confirm(
			`Ary you sure to delete the task: ${name}`
		);
		if (confirmation) {
			axios
				.delete(`https://todos-hero.herokuapp.com/tasks/${_id}`)
				.then((response) => {
					toast.warning("Delete Successfully", {
						id: "task_delete",
					});

					const restOfTasks = tasks.filter((task) => task._id !== _id);
					setTasks(restOfTasks);
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<div className='container my-5 border broder-secondary'>
			<div className='row justify-content-center'>
				<div className='col-sm-12 col-md-8'>
					{tasks.length ? (
						<>
							<h1 className='text-center text-secondary my-3'>Task List</h1>
							<table className='table table-hover table-responsive'>
								<thead>
									<tr>
										<th scope='col'>#</th>
										<th scope='col'>Task Name</th>
										<th scope='col'>Task Description</th>
										<th colSpan='2'>Actions</th>
									</tr>
								</thead>
								<tbody>
									{tasks.map((task, index) => {
										return (
											<tr key={task._id}>
												<th scope='row'>{index + 1}</th>
												<td
													className={
														task.completed
															? "text-decoration-line-through"
															: " "
													}
												>
													{task.name}
												</td>
												<td
													className={
														task.completed
															? "text-decoration-line-through"
															: " "
													}
												>
													{task.description}
												</td>
												<td>
													<button
														onClick={() =>
															handleComplete(task._id, task.completed)
														}
														className='btn btn-outline-secondary mb-1'
													>
														{task.completed ? "Completed" : "Not Complete"}
													</button>{" "}
													&nbsp;
													<button
														onClick={() => handleDelete(task._id, task.name)}
														className='btn btn-outline-danger mb-1'
													>
														Delete
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</>
					) : (
						<h1 className='text-center text-secondary my-3'>
							Please Add Some Task
						</h1>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
