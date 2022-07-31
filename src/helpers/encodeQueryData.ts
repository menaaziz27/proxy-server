export const encodeQueryData = (data) => {
  const ret = [];
  for (const d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
};
