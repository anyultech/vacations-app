import { RequestForm } from './RequestForm/RequestForm';
import { Counter } from './Counters/Counter';
import { RequestList } from './RequestList/RequestList.jsx';

export function Vacations() {
  return (
    <div className="m-auto flex flex-col gap-8">
      <section className="bg-slate-200 py-12">
        <div className="m-auto grid max-w-[800px] grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <RequestForm />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <Counter value="15" type="approved" />
            <Counter value="15" type="pending" />
            <Counter value="15" type="remaining" />
            <Counter value="15" type="declined" />
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
