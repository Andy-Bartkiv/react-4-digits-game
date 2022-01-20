function calcDigitMatch(str1, str2) {
    let res = [0, 0];
    for (let i = 0; i < str2.length; i++) {
      if (str1.indexOf(str2[i]) >= 0) res[0]++;
      if (str1[i] === str2[i]) res[1]++;
    }
    return res.join('');
  }

  export default calcDigitMatch;