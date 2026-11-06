import { useState, useEffect } from 'react'
import Tile from '../components/Tile'
import type { Entry } from '../types';
import { Leaf, Sprout } from 'lucide-react'

const Home = () => {
	const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
	const [users, setUsers] = useState<Entry[]>([])

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(`${API_URL}/api/entries`);

				if (!response.ok) throw new Error('Failed to fetch entries');

				const data: Entry[] = await response.json();
				setUsers(data);
			} catch (error) {
				console.error('Error fetching entries:', error);
			}
		};
		fetchUsers();
	}, []);

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(`${API_URL}/api/entries`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			});

			if (!response.ok) throw new Error('Failed to create entry');

			const newUser: Entry = await response.json();
			setUsers(prev =>
				[...prev, newUser].sort((a, b) => a.username.localeCompare(b.username))
			);
			setForm({
				username: '',
				soberSince: '',
				location: '',
				message: ''
			});
		} catch (error) {
			console.error('Error creating entry:', error);
		}
	};

	const renderedTiles = users.map(user => (
		<Tile key={user.id} user={user} />
	))

	return (
		<div className='mainPage home'>
			<div className='header'>
				<h1>One Day at a Time</h1>
			</div>
			<div className='iconBox'>
				<Leaf className='sprout' size={65}/>
			</div>
			<div className='child1'>
				<div className='formWrapper'>
					<form className='infoForm' onSubmit={handleSubmit}>
						<label htmlFor='username'>Username</label>
						<input id='username' name='username' maxLength={25} required value={form.username} onChange={handleChange} placeholder='Enter a Name'></input>
						<label htmlFor='username'>Sober Since</label>
						<input type='date' id='soberSince' name='soberSince' required value={form.soberSince} onChange={handleChange}></input>
						<label htmlFor='location'>Location</label>
						<input id='location' name='location' maxLength={30} required value={form.location} onChange={handleChange} placeholder='Where are you from?'></input>
						<label htmlFor='username'>Your Message</label>
						<textarea id='message' name='message' required value={form.message} maxLength={185} onChange={handleChange} placeholder='Share a message with the world.'></textarea>
						<button type='submit' className='formBtn'>Post to Wall</button>
					</form>
				</div>
			</div>
			<div className='iconBox'>
				<Sprout className='sprout' size={65}/>
			</div>
			<div className='child2'>
				{renderedTiles}
			</div>
		</div>
	);
}

export default Home