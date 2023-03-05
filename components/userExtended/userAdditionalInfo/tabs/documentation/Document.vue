<template lang="pug">

.document
  .wrapper
    .header
      img.titel-logo( src="@/assets/img/doc-status-success.svg" )
      .titel {{ doc.name }}
    v-divider
    .body
      .attachment-list
        Attachment.list-item( v-for="( attachment, index ) in doc.media" :key="index" :picture="attachment" )
        EmptyAttachment.list-item(
          v-for="emptyAttachment in emptyAttachments" :key="emptyAttachment"
          :cntr_uuid="cntr_uuid"
          :doc_uuid="doc.uuid"
          :index="emptyAttachment"
        )

</template>

<script>

  import Attachment from "./Attachment";
  import EmptyAttachment from "./EmptyAttachment";

  export default {

    props : {
      doc : {
        type      : Object,
        required  : true,
      },

      cntr_uuid : {
        type : String,
        required : true,
      },
    },

    components : {
      Attachment,
      EmptyAttachment,
    },

    computed : {
      emptyAttachments ()
      {
        return this.doc.count_media - this.doc.media.length >= 0 ? this.doc.count_media - this.doc.media.length : 0;
      },
    },

    data ()
    {
      return {}
    },

    methods : {
      getters ()
      {
        return {}
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {}
      },

      helpers ()
      {
        return {}
      },

      init (){},

      bindActions (){},
    },

    mounted ()
    {
      console.log( 'Doc mounted', this.doc.count_media, this.doc.media.length, this.doc.count_media - this.doc.media.length );
    },

  }

</script>

<style lang="scss" scoped>

/* OBJECTS STYLES START */

  .document
  {
    .wrapper
    {
      .header
      {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 18px;

        .titel
        {
          font-style: normal;
          font-weight: bold;
          font-size: 22px;
          line-height: 125%;
          color: #263043;
          margin-left: 15px;
        }
      }
    }
  }

  .attachment-list
  {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    padding-top: 20px;
    margin-bottom: 30px;

    .list-item
    {
      margin-left : 25px;

      &:first-child
      {
        margin-left : 0;
      }
    }
  }

/* OBJECTS STYLES END */

</style>
