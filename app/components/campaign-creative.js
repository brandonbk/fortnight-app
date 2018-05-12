import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: [ 'card', 'mnh-100' ],

  src: computed('image.{src,focalPoint.x,focalPoint.y}', function() {
    const { src, focalPoint } = this.get('image');
    const { x, y } = focalPoint || {};
    if (!src) return 'https://via.placeholder.com/640x360?text=No%20Image%20Uploaded+';
    return `${src}?w=300&h=169&crop=focalpoint&fit=crop&dpr=1&fp-x=${x}&fp-y=${y}`
  }),

  hasSrc: computed('image.src', function() {
    const { src } = this.get('image');
    if (src) return true;
    return false;
  }),

  init() {
    this._super(...arguments);

    const { id, name, url, title, teaser, image } = this.get('creative');
    this.setProperties({ id, name, url, title, teaser, image: image || {} });
  },
});
