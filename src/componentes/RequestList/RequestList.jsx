import { RequestItem } from '../RequestItem/RequestItem';
import styles from './RequestList.module.scss';

const items = [
  { id: '1', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '2', from: '12/09/2024', to: '12/09/2025', state: 'pending' },
  { id: '3', from: '12/09/2024', to: '12/09/2025', state: 'declined' },
  { id: '4', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '5', from: '12/09/2024', to: '12/09/2025', state: 'declined' },
  { id: '6', from: '12/09/2024', to: '12/09/2025', state: 'declined' },
  { id: '7', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '8', from: '12/09/2024', to: '12/09/2025', state: 'declined' },
  { id: '9', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '10', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '11', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
  { id: '12', from: '12/09/2024', to: '12/09/2025', state: 'approved' },
];

export function RequestList() {
  return (
    <div className={styles.requestList}>
      <header>
        <div>From</div>
        <div>To</div>
        <div>State</div>
        <div>Actions</div>
      </header>
      <section>
        {items.map((item) => (
          <RequestItem {...item}/>
        ))}
      </section>
    </div>
  );
}
