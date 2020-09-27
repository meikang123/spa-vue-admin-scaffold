路由配置数据--
------

```javascript
import Layout from '@/layout';

export default [{
  path: '/test',
  component: Layout,
  redirect: '/test/index',
  name: 'test',
  meta: { title: '测试', icon: 'test', noCache: false, roles: [1, 2] },
  children: [{
    path: 'index',
    component: () => import('@/views/test/index'),
    name: 'testIndex',
    meta: { title: '测试列表', noCache: false, roles: [1, 2] }
  }]
}];

```
