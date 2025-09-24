import { Icon } from "../common/Icon";
import styles from './Counters.module.scss';

const ICON_TYPE_MAP = {
  approved: 'checkCircle',
  remaining: 'question',
  pending: 'clock',
  declined: 'xCircle',
  deleted: 'trash'
   
};

const TYPE_TEXT_MAP = {
    approved: 'Approved',
  remaining: 'Remaining',
  pending: 'Pending of approval',
  declined: 'Declined',
  deleted: 'Deleted'
}

export function Counter(props) {
  const { value, type } = props;
  return (
    <section className={styles.counter} data-type={type}>
      <Icon icon={ICON_TYPE_MAP[type]} />
      <section>
        <h2>{value}</h2>
        <p>{TYPE_TEXT_MAP[type]}</p>
      </section>
    </section>
  );
}

