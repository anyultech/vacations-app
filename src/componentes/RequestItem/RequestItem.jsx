import dayjs from 'dayjs';
import styles from './RequestItem.module.scss';
import { Icon } from '../common/Icon';
import { useRequestActions } from '../../hooks/useVacations';

export function RequestItem(props) {
  const { from, to, state, id } = props;
  const { decline, approve } = useRequestActions(props);
  return (
    <div data-id={id} className={styles.requestItem}>
      <div>{dayjs(from).format('DD/MM/YYYY')}</div>
      <div>{dayjs(to).format('DD/MM/YYYY')}</div>
      <div data-state={state}>{state}</div>

      <div>
        {state === 'pending' && (
          <>
            {' '}
            <Icon
              icon={'xCircle'}
              className="text-red-400"
              title="Decline"
              onClick={decline}
            />
            <Icon
              icon={'checkCircle'}
              className="text-lime-400"
              title="Approve"
              onClick={approve}
            />
          </>
        )}
      </div>
    </div>
  );
}
