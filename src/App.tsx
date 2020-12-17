import styles from './App.module.css';
import { ITunes } from './itunes/ITunes';

function App() {
  return (
    <div className={styles['App']}>
      <header className={styles['App-header']}>
        <ITunes />
      </header>
    </div>
  );
}

export default App;
