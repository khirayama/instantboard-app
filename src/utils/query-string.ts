const queryString = {
  parse: (query: string): any => {
    const kvs: string[] = query.replace('?', '').split('&');
    const result = {};
    kvs.forEach((kv: string) => {
      const kvArray = kv.split('=');
      result[kvArray[0]] = kvArray[1];
    });
    return result;
  },
};
export default queryString;
