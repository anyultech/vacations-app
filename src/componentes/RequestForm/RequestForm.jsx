import { useState } from 'react';
import styles from './RequestForm.module.scss';
import dayjs from 'dayjs';
import {
  useSendRequest,
  useVacationInfo,
  useVacationRequests,
} from '../../hooks/useVacations';
import { useEffect } from 'react';

export function RequestForm() {
  const [currentRequest, setCurrentRequest] = useState({
    from: dayjs().startOf('day'),
    to: dayjs().startOf('day'),
  });
  const [error, setError] = useState('');

  const { handleSubmit } = useSendRequest();
  const { vacationInfo } = useVacationInfo();
  const { requests } = useVacationRequests();

  function validateRequest() {
    if (!currentRequest.from || !currentRequest.to)
      return setError('From & To are required fields');

    const { to, from } = currentRequest;
    if (from.isAfter(to)) return setError("From can't be greater than To");

    if (to.diff(from, 'days') >= vacationInfo.remaining)
      return setError("Request days can't be greater than Remaining days");

    for (const request of requests.filter(({ state }) =>
      ['approved', 'pending'].includes(state),
    )) {
      const dateTo = dayjs(request.to);
      const dateFrom = dayjs(request.from);

      if (
        dateTo.isSame(to) ||
        dateTo.isSame(from) ||
        (to.isBefore(dateTo) && to.isAfter(dateFrom))
      )
        return setError("To can't overlap with another request");
      if (
        dateFrom.isSame(to) ||
        dateFrom.isSame(from) ||
        (from.isBefore(dateTo) && from.isAfter(dateFrom))
      )
        return setError("From can't overlap with another request");
    }

    setError(null);
  }

  useEffect(() => {
    validateRequest();
  }, [currentRequest, vacationInfo.remaining, requests]);

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
            value={currentRequest.from.format('YYYY-MM-DD')}
            type="date"
            name="from"
            id="from"
            onChange={(e) =>
              setCurrentRequest({
                ...currentRequest,
                from: dayjs(e.currentTarget.value).startOf('day'),
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
            value={currentRequest.to.format('YYYY-MM-DD')}
            onChange={(e) =>
              setCurrentRequest({
                ...currentRequest,
                to: dayjs(e.currentTarget.value).startOf('day'),
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
          <textarea name="obs" id="obs" />
        </div>
        {error && <p>{error}</p>}
        <button disabled={error}>Request</button>
      </section>
    </form>
  );
}
