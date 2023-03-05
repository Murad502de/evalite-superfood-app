<template>
  <div class="map-container" :style="{ height: height + 'px' }">
    <yandex-map :coords="center_coords" :zoom="zoom">
      <template v-for="(item, index) in markers">
        <ymap-marker v-if="item" :key="item.uuid" :coords="item.geometry.coordinates" :marker-id="item.uuid"
          :hint-content="item.properties.hintContent" marker-type="placemark"
          :balloon-template="balloonTemplate(item.info, item.uuid)" />
      </template>
    </yandex-map>
  </div>

</template>

<script>
export default {
  props: [
    'center_coords',
    'markers',
    'zoom',
    'height',
    'entity',
  ],
  data() {
    return {}
  },
  methods: {
    balloonTemplate(info, uuid) {
      if (this.entity === 'contractor') {
        return `
          <h2 class="balloon-header">${info.name}</h2>
          <p>Рейтинг: ${info.raiting}</p>
          <p>Описание: ${info.description}</p>
          <a href="/tasks/contractor/${uuid}">Перейти</a>
        `;
      }
      else {
        return `
          <h2 class="balloon-header">${info.name}</h2>
          <p>Рейтинг: ${info.raiting}</p>
          <p>Описание: ${info.description}</p>
          <a href="/objects/${uuid}">Перейти</a>
        `;
      }
    }
  }
}
</script>

<style lang="scss">
@import '/assets/scss/colors.scss';

.ruqi {
  .ymap-container {
    width: 100%;
    height: 100%;
  }

  .balloon-header {
    padding-bottom: 10px;
  }
}
</style>
