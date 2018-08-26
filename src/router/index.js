import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/list'
import AddToken from '@/components/add-token'
import Detail from '@/components/detail'
import QRCode from '@/components/qr-code'
import SendDetail from '@/components/send-detail'
import Likers from '@/components/likers'
import Ower from '@/components/ower'
import OwerDetail from '@/components/ower-detail'
import Flow from '@/components/flow'
import PersonCenter from '@/components/person-center'
import Helper from '@/components/helper'
import Poster from '@/components/poster'
import AddEnvelope from '@/components/add-envelope'
import Envelope from '@/components/envelope'
import OpenEnvelope from '@/components/open-envelope'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/addToken',
      name: 'AddToken',
      component: AddToken
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/qrcode',
      name: 'QRCode',
      component: QRCode
    },
    {
      path: '/senddetail',
      name: 'SendDetail',
      component: SendDetail
    },
    {
      path: '/likers/:id',
      name: 'Likers',
      component: Likers
    },
    {
      path: '/ower/:uid',
      name: 'Ower',
      component: Ower
    },
    {
      path: '/owerdetail/:id',
      name: 'OwerDetail',
      component: OwerDetail
    },
    {
      path: '/flow/:uid/:tid',
      name: 'Flow',
      component: Flow
    },
    {
      path: '/personcenter',
      name: 'PersonCenter',
      component: PersonCenter
    },
    {
      path: '/helper',
      name: 'Helper',
      component: Helper
    },
    {
      path: '/poster',
      name: 'Poster',
      component: Poster
    },
    {
      path: '/addEnvelope/:id',
      name: 'AddEnvelope',
      component: AddEnvelope
    },
    {
      path: '/envelope',
      name: 'Envelope',
      component: Envelope
    },
    {
      path: '/openEnvelope',
      name: 'OpenEnvelope',
      component: OpenEnvelope
    }
  ]
})
