import styles from './About.module.css';

export default function About() {
    return (
        <section className={styles.about}>
            <h2>About This App</h2>
            <p>
                This Todo List app was built as part of my learning journey with{" "}
                <strong>React</strong> and <strong>Code the Dream</strong>. 
                It uses React Router to navigate between pages and includes features 
                like filtering, sorting, and pagination.
            </p>
            <p>
                My name is <strong>Fatima Macias</strong>. I am a full-stack developer 
                with experience in Microsoft and Python/FastAPI stacks, and I am expanding 
                my skills in the React ecosystem through this project.
            </p>
            <p>
                The goal of this app is not only to practice technical skills, but also 
                to demonstrate clean structure, reusable components, and good development practices.
            </p>
        </section>
    );
}
