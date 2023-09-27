import styles from '../styles/Display.module.scss';
// import CreditCardIcon from '../images/card-logo.svg';

export function Display({ date }) {
	const loopThroughDate = () => {
		const keys = Object.keys(date);
		console.log(date);
		return keys.map(key => (
			<li key={key}>
				<span>{date[key] !== '' ? date[key] : '--'}</span> {date[key] === 1 ? key : `${key}s`}
			</li>
		));
	};

	return <ul className={styles.display_container}>{loopThroughDate()}</ul>;
}
