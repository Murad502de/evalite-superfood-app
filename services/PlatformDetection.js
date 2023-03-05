export default class {
  store = null;

  constructor({ store, }) {
    this.setStore(store);

    console.debug('platformDetection');
  }

  /* SETTERS */
  async setStore(store) {
    this.store = store ? store : this.store;
  }

  /* ACTIONS */
  async onSubscribe() {
    window.addEventListener('resize', this.handleSubscribe);
  }
  async offSubscribe() {
    window.removeEventListener('resize', this.handleSubscribe);
  }

  /* HANDLERS */
  handleSubscribe = async (event) => {
    this.initPlatforms({ width: Number(event.target.outerWidth) });
  }

  /* HELPERS */
  async initPlatforms({ width, }) {
    this.store._actions['platformDetection/setIsMobile'][0]({ isMobile: width <= 480 });
    this.store._actions['platformDetection/setIsTablet'][0]({ isTablet: width > 480 && width <= 768 });
    this.store._actions['platformDetection/setIsSmallScreen'][0]({ isSmallScreen: width > 768 && width <= 1024 });
    this.store._actions['platformDetection/setIsLargeScreen'][0]({ isLargeScreen: width > 1024 && width <= 1200 });
    this.store._actions['platformDetection/setIsExtraLargeScreen'][0]({ isExtraLargeScreen: width > 1200 });
  }
}
