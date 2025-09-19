import styles from './RequestForm.module.scss';

export function RequestForm(){
    return (
         <form className={styles.requestForm}>
        <header>New request</header>
        <section className="">
          <div>
            <label htmlFor="from">
              From: <span>*</span>
            </label>
            <input
              type="date"
              name="from"
              id="from"
              placeholder="select date"
           />
          </div>
          <div>
            <label htmlFor="to">
              To: <span>*</span>
            </label>
            <input type="date" name="to" id="to" placeholder="select date" />
          </div>
          <div>
            <label htmlFor="obs">Obs: </label>
            <textarea name="obs" id="obs" />
          </div>
          <button>Request</button>
        </section>
      </form>
    );
}