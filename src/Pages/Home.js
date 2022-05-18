import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	// const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`https://todos-hero.herokuapp.com/tasks`)
			.then((response) => {
				setTasks(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [tasks]);

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
										<th scope='col'>Actions</th>
									</tr>
								</thead>
								<tbody>
									{tasks.map((task, index) => {
										return (
											<tr key={task._id}>
												<th scope='row'>{index + 1}</th>
												<td>{task.name}</td>
												<td>{task.description}</td>
												<td>
													<button className='btn btn-outline-secondary mb-1'>
														{task.completed ? "Completed" : "Not Complete"}
													</button>{" "}
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
