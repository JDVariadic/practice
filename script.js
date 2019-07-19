function recursiveExponents(x,y) {
  if(y == 0) {
    return 1
  }
  return (x * recursiveExponents(x, y-1))
}
