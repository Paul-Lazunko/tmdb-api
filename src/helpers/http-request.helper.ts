import { get } from 'https';

export function httpRequestHelper(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let data: string = '';
    get(url, (res) => {
      res.on('data', (chunk: Buffer) => {
        data += chunk.toString();
      });
      res.on('end', () => {
        resolve(data)
      })
    }).on('error', (e: Error) => {
      reject(e)
    });
  })
}
