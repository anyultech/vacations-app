export function RequestItem(props) {
  const { from, to, state } = props;
  return (
    <div>
      <div>{from}</div>
      <div>{to}</div>
      <div>{state}</div>
      <div>ACTIONS</div>
    </div>
  );
}
