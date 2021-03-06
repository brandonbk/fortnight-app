import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';
import moment from 'moment';

import mutation from 'fortnight/gql/mutations/campaign/create';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async create({ name, description, advertiser, url, externalLinks }) {
      this.startAction();
      const payload = {
        name,
        description,
        advertiserId: get(advertiser || {}, 'id'),
        url,
        externalLinks,
        startDate: moment().startOf('day').valueOf(),
      };
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createCampaign');
        this.get('notify').info('Campaign successfully created.');
        return this.transitionToRoute('manage.campaign.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
