// import styles from '../styles/CreditCard.module.scss';
// import CreditCardIcon from '../images/card-logo.svg';

export function Display({ date }) {
	const { day, month, year } = { ...date };
	const currentDate = new Date();

	return (
		<div>
			{' '}
			{/* className={`${styles.credit_card_front} ${styles.credit_card}`}> */}
			<img /> {/* alt='credit-card-logo' className={styles.card_logo} />  */}
			<div>
				{' '}
				{/* className={styles.card_expiration}> */}
				{year ? year : '--'} years
			</div>
			<div>
				{' '}
				{/* className={styles.card_name}> */}
				{month ? month : '--'} months
			</div>
			<div>
				{' '}
				{/* className={styles.card_number}> */}
				{day ? day : '--'} days
			</div>
			<div>
				{' '}
				{/* className={styles.card_number}> */}
				{currentDate.getFullYear()} Year
			</div>
			<div>
				{' '}
				{/* className={styles.card_number}> */}
				{currentDate.getMonth() + 1} month
			</div>
			<div>
				{' '}
				{/* className={styles.card_number}> */}
				{currentDate.getDate()} days
			</div>
		</div>
	);
}
