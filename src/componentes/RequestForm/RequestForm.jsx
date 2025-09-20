import { useState } from 'react';
import styles from './RequestForm.module.scss';
import dayjs from 'dayjs';
import { useSendRequest, useVacationInfo } from '../../hooks/useVacations';

export function RequestForm() {
  const [currentRequest, setCurrentRequest] = useState({
    from: '',
    to: '',
    observations: '',
  });

  const { handleSubmit } = useSendRequest();
  const { vacationInfo } = useVacationInfo();

  function validateDisabled() {
    if (!currentRequest.from || !currentRequest.to) return true;

    return dayjs(currentRequest.from).isAfter(dayjs(currentRequest.to));
  }

  if (!vacationInfo.remaining)
    return (
      <div className={styles.errorMessage}>You don't have remaining days</div>
    );

  return (
    <form className={styles.requestForm} onSubmit={handleSubmit}>
      <header>New request</header>
      <section>
        <div>
          <label htmlFor="from">
            From: <span>*</span>
          </label>
          <input
            required
            value={currentRequest.from}
            type="date"
            name="from"
            id="from"
            onChange={(e) =>
              setCurrentRequest({
                ...currentRequest,
                from: e.currentTarget.value,
              })
            }
            placeholder="select date"
          />
        </div>
        <div>
          <label htmlFor="to">
            To: <span>*</span>
          </label>
          <input
            value={currentRequest.to}
            onChange={(e) =>
              setCurrentRequest({
                ...currentRequest,
                to: e.currentTarget.value,
              })
            }
            required
            type="date"
            name="to"
            id="to"
            placeholder="select date"
          />
        </div>
        <div>
          <label htmlFor="obs">Obs: </label>
          <textarea
            name="obs"
            id="obs"
            value={currentRequest.observations}
            onChange={(e) =>
              setCurrentRequest({
                ...currentRequest,
                observations: e.currentTarget.value,
              })
            }
          />
        </div>
        <button disabled={validateDisabled()}>Request</button>
      </section>
    </form>
  );
}
