const lst: string[] = [];
((lst: string[]) => {
  lst.sort(() => 0.5 - Math.random());

  console.log(lst);
})(lst);
