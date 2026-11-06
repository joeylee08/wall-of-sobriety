import { useState } from 'react'
import Tile from '../components/Tile'

const Home = () => {

	const [form, setForm] = useState({
		username: '',
		soberSince: '',
		location: '',
		message: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const handleSubmit = () => {
		console.log('penis')
	}
	return (
		<div className='mainPage home'>
			<div className='header'>
				<h1>One Day at a Time</h1>
				<h2>A little wall of people choosing sobriety.</h2>
			</div>
			<div className='child1'>
				<div className='formWrapper'>
					<form className='infoForm'>
						<label htmlFor='username'>Username</label>
						<input id='username' name='username' value={form.username} onChange={handleChange} placeholder='Enter a Name'></input>
						<label htmlFor='username'>Sober Since</label>
						<input type='date' id='soberSince' name='soberSince' value={form.soberSince} onChange={handleChange}></input>
						<label htmlFor='location'>Location</label>
						<input id='location' name='location' value={form.location} onChange={handleChange} placeholder='Where are you from?'></input>
						<label htmlFor='username'>Your Message</label>
						<textarea id='message' name='message' value={form.message} onChange={handleChange} placeholder='Share a message with the world.'></textarea>
						<button type='submit' onSubmit={handleSubmit} className='formBtn'>Submit</button>
					</form>
				</div>
			</div>
			<div className='child2'>
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
			</div>
		</div>
	);
}

export default Home