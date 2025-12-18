import { Link } from "react-router";
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <section className={styles.not_found}>
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className={styles.back_home}>
        Go back to Home
      </Link>
    </section>
  );
}
