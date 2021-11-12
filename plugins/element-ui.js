import Vue from 'vue'
import Button from 'element-ui/lib/button'
import Collapse from 'element-ui/lib/collapse'
import CollapseItem from 'element-ui/lib/collapse-item'
import Dialog from 'element-ui/lib/dialog'
import Dropdown from 'element-ui/lib/dropdown'
import DropdownItem from 'element-ui/lib/dropdown-item'
import DropdownMenu from 'element-ui/lib/dropdown-menu'
import Input from 'element-ui/lib/input'
import Loading from 'element-ui/lib/loading'
import Message from 'element-ui/lib/message'
import Option from 'element-ui/lib/option'
import Pagination from 'element-ui/lib/pagination'
import Popover from 'element-ui/lib/popover'
import Progress from 'element-ui/lib/progress'
import RadioButton from 'element-ui/lib/radio-button'
import RadioGroup from 'element-ui/lib/radio-group'
import Rate from 'element-ui/lib/rate'
import Row from 'element-ui/lib/row'
import Select from 'element-ui/lib/select'
import TabPane from 'element-ui/lib/tab-pane'
import Tabs from 'element-ui/lib/tabs'
import Steps from 'element-ui/lib/steps'
import Step from 'element-ui/lib/step'
import Carousel from 'element-ui/lib/carousel'
import CarouselItem from 'element-ui/lib/carousel-item'

Vue.use(Button)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Input)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Rate)
Vue.use(Row)
Vue.use(Select)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
