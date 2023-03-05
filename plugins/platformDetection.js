import PlatformDetection from '@/services/PlatformDetection';

export default ({ store, }, inject) => {
  inject('platformDetection', new PlatformDetection({
    store,
  }));
}
