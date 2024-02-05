import UserProvider from './UserStore';

function Providers({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

export default Providers;
