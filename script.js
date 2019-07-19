function exponent(x,y) {
  let output = x
  for(let i=1 ; i < y ;i++) {
       output = output * x
  }
  return output;
}
