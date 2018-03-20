const queryString = {
  parse: (query: string): any => {
    const q: string[] = query.substring(1).split('&');

    return q.reduce((result, kv) => {
      const pair = kv.split('=');
      result[pair[0]] = decodeURIComponent(pair[1]);
      return result;
    },              {});
  }
};
export default queryString;
