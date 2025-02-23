import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/materials',
      name: 'materials',
      component: () => import('@/views/MaterialsView/Index.vue'),
      redirect: '/select-group',
      children: [
        {
          path: '/select-group',
          name: 'select-group',
          component: () => import('@/views/MaterialsView/SelectGroupView.vue'),
          children: [
            {
              path: '/single-select',
              name: 'single-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingSelect.vue'),
            },
          ],
        },
        {
          path: '/input-group',
          name: 'input-group',
          component: () => import('@/views/MaterialsView/InputGroup.vue'),
        },
      ],
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/EditorView/Index.vue'),
    },
  ],
});

router.beforeEach((from, to, next) => {
  next();
});

export default router;
