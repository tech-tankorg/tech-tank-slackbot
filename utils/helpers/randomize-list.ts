const lst: string[] = [];
((lst: string[]) => {
  lst.sort(() => 0.5 - Math.random());

  console.log(lst);
})(lst);

export const randomize_list = <T>(lst: T[]) => {
  lst.sort(() => 0.5 - Math.random());
};
