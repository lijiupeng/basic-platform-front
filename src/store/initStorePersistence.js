export default (store) => {
  // 不需要持久化的数据存入sessionStorage
  if (sessionStorage.getItem("store")) {
    store.replaceState(
      Object.assign(
        {},
        store.state,
        JSON.parse(sessionStorage.getItem("store"))
      )
    );
    // 移除sessionStorage中的数据
    sessionStorage.removeItem("store");
  }
  // 页面刷新的时候进行持久化
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("store", JSON.stringify(store.state));
  });
};
