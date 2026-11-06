import calculateSobriety from "../util/helpers";

const Tile = ({}) => {
	
	const user = {
		username: 'BillyBob',
		soberSince: '2025-12-24',
		location: 'Dallas, TX',
		message: 'I drank for 25 years before deciding that this is not who I wanted to be anymore.'
	}

	const duration = calculateSobriety(user.soberSince)

	const truncated = () => {
		if (duration?.years === 0 && duration?.months === 0) return `${duration.days} d`
		else if (duration?.years === 0) return `${duration.months} Mo, ${duration.days} d`
		else return `${duration?.years} Yr, ${duration?.months} Mo, ${duration?.days} d`
	}

	return (
		<div className="tile">
			<div className='nameLocation'>
				<h3>{user.username}</h3>
				<p>{user.location}</p>
			</div>
			<h2>
				{truncated()}
			</h2>
			<p>{user.message}</p>
		</div>
	);
};

export default Tile;