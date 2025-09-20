import { useVacationRequests } from '../../hooks/useVacations';
import { RequestItem } from '../RequestItem/RequestItem';
import styles from './RequestList.module.scss';

export function RequestList() {
  const { requests } = useVacationRequests();

  return (
    <div className={styles.requestList}>
      <header>
        <div>From</div>
        <div>To</div>
        <div>State</div>
        <div>Actions</div>
      </header>
      <section>
        {requests.map((item) => (
          <RequestItem {...item} />
        ))}
      </section>
    </div>
  );
}
