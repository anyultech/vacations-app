import { RequestForm } from './RequestForm/RequestForm';
import { Counter } from './Counters/Counter';
import { RequestList } from './RequestList/RequestList.jsx';
import { useVacationInfo } from '../hooks/useVacations.js';

export function Vacations() {
  const { vacationInfo } = useVacationInfo();

  return (
    <div className="m-auto flex flex-col gap-8">
      <section className="bg-slate-200 py-12">
        <div className="m-auto grid max-w-[800px] grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <RequestForm />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <Counter value={vacationInfo.approved} type="approved" />
            <Counter value={vacationInfo.pending} type="pending" />
            <Counter value={vacationInfo.remaining} type="remaining" />
            <Counter value={vacationInfo.declined} type="declined" />
            <Counter value={vacationInfo.deleted} type="deleted" />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="m-auto grid max-w-[800px]">
          <RequestList />
        </div>
      </section>
    </div>
  );
}
