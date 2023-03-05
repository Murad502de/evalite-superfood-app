<template lang="pug">
svg.rq-icon(
  :width="width"
  :height="height"
  :viewBox="viewBox"
  :fill="fill"
  xmlns="http://www.w3.org/2000/svg"
  :class="[{'rq-icon_preloader': preloader}]"
)
  path(
    fill-rule="evenodd"
    clip-rule="evenodd"
    :d="getIconData"
  )
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    viewBox: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: '#000'
    },
    preloader: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        preloader: "M12.5 8.5C13.8807 8.5 15 7.38071 15 6C15 4.61929 13.8807 3.5 12.5 3.5C11.3255 3.5 10.3402 4.30992 10.072 5.40172C7.12149 6.41069 5 9.20759 5 12.5C5 16.6421 8.35786 20 12.5 20C16.4741 20 19.7263 16.909 19.9836 13H17.9776C17.725 15.8033 15.369 18 12.5 18C9.46243 18 7 15.5376 7 12.5C7 10.1945 8.41848 8.22041 10.4303 7.40271C10.88 8.06494 11.6392 8.5 12.5 8.5Z",
        close: "M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z",
        clip: "M11.2573 1.31243L15.6876 5.74268C16.6428 6.6979 16.3815 8.30824 15.1732 8.91238L10.7796 11.1092C10.6578 11.1701 10.5647 11.2763 10.5203 11.405L9.40186 14.6424C9.12551 15.4424 8.10707 15.677 7.50861 15.0785L5.08335 12.6532L1.23657 16.5H0.5V15.7634L4.34678 11.9167L1.92153 9.49142C1.32307 8.89295 1.55765 7.87451 2.35762 7.59816L5.59505 6.47977C5.72376 6.43531 5.82994 6.34221 5.89084 6.22041L8.08762 1.82681C8.69175 0.618527 10.3021 0.357204 11.2573 1.31243Z",
      }
    }
  },
  computed : {
    getIconData  () {
      if (this.preloader) return this.icons['preloader']
      return this.icons[this.name] || this.icons[0]
    }
  }
}

</script>

<style lang="scss">
.rq-icon {
  &_preloader {
    animation: spin infinite linear 1s;
  }
}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}

</style>
