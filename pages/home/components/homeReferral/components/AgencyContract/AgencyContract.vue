<template lang="pug">
.agency-contract
  AppFormDoc.agency-contract__form(:data="null", title="qwerty")
    template(v-slot:header)
      .agency-contract__form-header
        .agency-contract__title Внимание!
        .agency-contract__desc Перед тем, как Ваш аккаунт будет переведен в статус проведения верификации, необходимо загрузить подписанный экземпляр агентского договора, который был отправлен Вам на указанный, при регистрации, E-mail.
        span.agency-contract__info Если договор не был получен по Email, то Вы можете его&nbsp;
        span.agency-contract__download.agency-contract__download-stub(v-show="!url") получить
        a.agency-contract__download(
          v-show="url",
          :href="url",
          download="Агентский договор на поиск клиентов.pdf"
        ) получить
</template>

<script src="./AgencyContract.js" />
<style lang="scss" src="./AgencyContract.scss" />
