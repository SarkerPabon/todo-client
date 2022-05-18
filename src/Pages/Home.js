import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
													<Link
														to={`/tasks/${task._id}`}
														className='btn btn-outline-secondary mb-1'
													>
														{task.completed ? "Completed" : "Not Complete"}
													</Link>{" "}
													<button className='btn btn-outline-danger mb-1'>
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
