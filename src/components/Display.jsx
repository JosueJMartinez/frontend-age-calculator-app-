import styles from '../styles/Display.module.scss';

export function Display({ date }) {
	const loopThroughDate = () => {
		const keys = Object.keys(date);

		return keys.map(key => (
			<li key={key}>
				<span className={`${styles.character} ${date[key] !== '' ? styles.transformed : ''}`}>
					{'-- '}
				</span>
				<span className={`${styles.character} ${date[key] !== '' ? '' : styles.transformed}`}>
					{`${date[key]} `}
				</span>
				{date[key] === 1 ? key : `${key}s`}
			</li>
		));
	};

	return <ul className={styles.display_container}>{loopThroughDate()}</ul>;
}
