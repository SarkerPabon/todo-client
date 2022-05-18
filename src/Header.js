import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
	const navLinkStyles = ({ isActive }) => {
		return {
			borderBottom: isActive ? "1px solid white" : "",
			fontWeight: isActive ? "bold" : "normal",
		};
	};
	return (
		<Navbar bg='secondary' expand='lg'>
			<Container>
				<Navbar.Brand as={Link} to='/' className='text-white'>
					Todos Hero
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav
						className='ms-auto my-2 my-lg-0'
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link
							as={NavLink}
							to='/'
							className='text-white'
							style={navLinkStyles}
						>
							Home
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to='/login'
							className='text-white'
							style={navLinkStyles}
						>
							Login
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
