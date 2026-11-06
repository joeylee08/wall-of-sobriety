import calculateSobriety from "../util/helpers";
import type { Entry } from '../types';

type TileProps = {
	user: Entry;
};

const Tile = ({ user }: TileProps) => {
	
	const duration = calculateSobriety(user.soberSince)

	const truncated = () => {
		if (duration?.years === 0 && duration?.months === 0) return `${duration.days} d`
		else if (duration?.years === 0) return `${duration.months} Mo, ${duration.days} d`
		else return `${duration?.years} Yr, ${duration?.months} Mo, ${duration?.days} d`
	}

	return (
		<div className="tile">
			<h3>{user.username}</h3>
			<h2>{truncated()}</h2>
			<p>{user.message}</p>
			<p className='location'>{user.location}</p>
		</div>
	);
};

export default Tile;