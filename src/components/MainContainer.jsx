import { useState } from 'react';

import styles from '../styles/MainContainer.module.scss';
import { Container, Card } from 'react-bootstrap';

import { DateForm } from './DateForm';
import { Display } from './Display';

function MainContainer() {
	const [durationDate, setDurationDate] = useState({
		day: '',
		month: '',
		year: '',
		complete: false,
	});

	const handleDurationDateChange = durationDate => {
		setDurationDate(durationDate);
	};

	return (
		<main>
			<Container className={styles.mainContainer}>
				<Card className={`${styles.mainContainer_card} ${styles.card}`}>
					<Card.Body>
						<DateForm handleDurationDateChange={handleDurationDateChange} />
						<Display date={durationDate} />
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}

export default MainContainer;
