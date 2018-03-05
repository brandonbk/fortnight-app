import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'fortnight/gql/mutations/create-template';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model() {
    return { name: '' };
  },
  actions: {
    create({ name, html, fallback }) {
      const resultKey = 'createTemplate';
      const payload = { name, html, fallback };
      const variables = { input: { payload } };
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        .then(response => this.transitionTo('template.edit', response.id))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})