import { Button } from '@chakra-ui/react';
import styles from './App.module.css';
import { Counter } from './counter/Counter';

function App() {
  return (
    <div className={styles['App']}>
      <header className={styles['App-header']}>
        <Counter />
        <Button colorScheme="blue">Hello world!</Button>
      </header>
    </div>
  );
}

export default App;
