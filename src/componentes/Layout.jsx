import { useAppContext } from '../context/AppContext';

export function Layout({ children }) {
  const { currentUser } = useAppContext();
  return (
    <div>
      <header className="flex justify-between bg-lime-400 px-2 py-4">
        <div className="text-xl font-bold capitalize">
          {currentUser.fullName}
        </div>
        <div className="text-xl capitalize">{currentUser.role}</div>
      </header>
      <section>{children}</section>
    </div>
  );
}
