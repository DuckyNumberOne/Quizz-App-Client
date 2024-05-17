const useAuth = () => {
  const localStorageToken = window.localStorage.getItem("token");
  const tokenValue = JSON.parse(localStorageToken ?? "");
  return tokenValue;
};

export default useAuth;
