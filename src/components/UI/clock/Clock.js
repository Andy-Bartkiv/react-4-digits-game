import React, { useContext, useEffect, useState } from 'react';
import cls from './Clock.module.css'
// import { DataContext } from '../../../context';

function Clock() {
	
	const [date, setDate] = useState(new Date());
	const tick = () => setDate(new Date());
	const minutes = date.toLocaleTimeString('en-GB', {minute: '2-digit'});
	
	// const { setMin } = useContext(DataContext);
	// useEffect( () => setMin(minutes), [minutes] );

	useEffect( () => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	}, []);

	return (
		<h3 className = { cls.clock }>
			{ date.toLocaleTimeString() }
		</h3>
	)
}

export default Clock;