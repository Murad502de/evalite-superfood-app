import Socket from '@/services/Socket';

export default ({ store, }, inject) => {
  inject('socket', new Socket({
    url: process.env.WSS_URL,
    path: process.env.WSS_PATH,
    store,
  }));
}
