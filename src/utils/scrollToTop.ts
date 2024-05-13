export const scrollToTop = (id:string) => {
    const content = document.getElementById(id);
    if (content) {
      window.scrollTo({
        top: content?.offsetTop - 90,
        behavior: "instant",
      });
    }
  };