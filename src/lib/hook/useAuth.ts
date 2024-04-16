const useAuth = () => {
  const localStorageToken = window.localStorage.getItem("root");
  const dataToken = JSON.parse(localStorageToken ?? "");
  let tokenValue = dataToken.token?.slice(1, -1);
  return tokenValue;
};

export default useAuth;
