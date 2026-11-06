const Tile = ({ }) => {

	const user = {
		username: 'BillyBob',
		soberSince: 'December 24, 2025 @ 10:34 PM',
		location: 'Dallas, TX',
		message: 'I drank for 25 years before deciding that this is not who I wanted to be anymore.'
	}

	return (
		<div className="tile">
			<div className='nameLocation'>
				<h3>{user.username}</h3>
				<p>{user.location}</p>
			</div>
			<h2>2 Yr, 3 Mo, 23 d</h2>
			<p>{user.message}</p>
		</div>
	);
};

export default Tile;