import mergeProps from '@/utils/merge-props'
import './style.pcss'

const Link = {
  name: 'Link',
  functional: true,
  props: {
    id: { type: null, required: true },
    route: { type: String, required: true },
    routeQuery: { type: Object, default: () => ({}) },
    plain: { type: Boolean, default: false },
    format: {
      validator(value) {
        return value == null || Number.isInteger(value)
          || (Array.isArray(value) && value.length === 2 && value.every(Number.isInteger))
      }
    },
    colorClass: { type: String, default: 'text-filecoin' }
  },
  render(createElement, { data, props, slots, parent }) {
    const id = props.id == null ? '' : String(props.id)
    let tag
    const node = {
      class: ['filecoin-link'],
      attrs: {}
    }
    let linkSlots
    if (props.plain || !props.id) {
      tag = 'span'
      node.class.push('plain')
    } else {
      tag = 'nuxt-link'
      node.class.push(props.colorClass)
      node.props = {
        to: parent.localePath({ name: props.route, params: { id }, query: props.routeQuery })
      }
    }
    if (props.format == null) {
      linkSlots = slots().default || id
    } else {
      let head
      let tail
      if (Number.isInteger(props.format)) {
        head = tail = props.format
      } else {
        [head, tail] = props.format
      }
      if (!data?.attrs?.title) {
        node.attrs.title = id
      }
      if (head + tail + 1 >= id.length) {
        linkSlots = [id]
      } else {
        linkSlots = [
          id.slice(0, head),
          createElement('span', { class: 'ellipsis' }, id.slice(head, -tail)),
          id.slice(-tail)
        ]
      }
    }
    return createElement(tag, mergeProps(data, node), linkSlots)
  }
}

export default Link

export function createLink(category, { name = `${category}-link`, route = `${category}-id` } = {}) {
  return {
    name,
    functional: true,
    render(createElement, { data, props, children }) {
      if (data.attrs == null) {
        data.attrs = {}
      }
      Object.assign(data.attrs, props, { route })
      return createElement(Link, data, children)
    }
  }
}
