import logo from './logo.svg';
import styles from './App.module.css';
import { Button } from '@chakra-ui/react';

function App() {
  return (
    <div className={styles['App']}>
      <header className={styles['App-header']}>
        <Button colorScheme="blue">Hello world!</Button>
      </header>
    </div>
  );
}

export default App;
