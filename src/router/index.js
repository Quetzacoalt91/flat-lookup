import Router from 'vue-router';
import Form from '@/components/Form';
import Links from '@/components/Links';
import List from '@/components/List';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List,
    },
    {
      path: '/new',
      name: 'New flat',
      component: Form,
    },
    {
      path: '/links',
      name: 'Links',
      component: Links,
    },
  ]
});