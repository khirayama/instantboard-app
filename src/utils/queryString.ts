type queryType = {
  [key: string]: string;
};

export const queryString: {
  parse(query: string): queryType;
} = {
  parse: (query: string): queryType => {
    const q: string[] = query.substring(1).split('&');

    return q.reduce((result: queryType, kv: string): queryType => {
      const pair: string[] = kv.split('=');
      result[pair[0]] = decodeURIComponent(pair[1]);

      return result;
    }, {});
  },
};
