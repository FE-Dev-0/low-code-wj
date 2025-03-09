import { useMaterialStore } from '@/stores/useMaterials';
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
          redirect: '/single-select',
          children: [
            {
              path: '/single-select',
              name: 'single-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
          ],
        },
        {
          path: '/input-group',
          name: 'input-group',
          component: () => import('@/views/MaterialsView/InputGroup.vue'),
        },
        {
          path: '/note-group',
          name: 'note-group',
          component: () => import('@/views/MaterialsView/NoteGroupView.vue'),
          redirect: '/text-note',
          children: [
            {
              path: '/text-note',
              name: 'text-note',
              component: () => import('@/components/SurveyComs/Materials/NoteComs/TextNote.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/editor/:id(\\d+)?',
      name: 'editor',
      component: () => import('@/views/EditorView/Index.vue'),
      children: [
        {
          path: 'survey-type',
          name: 'survey-type',
          component: () => import('@/views/EditorView/LeftSide/SurveyType.vue'),
        },
        {
          path: 'outline',
          name: 'outline',
          component: () => import('@/views/EditorView/LeftSide/Outline.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { matched } = to;
  const store = useMaterialStore();
  if (matched.find((el) => el.name === 'materials' && to.name)) {
    store.setCurrentMaterialCom(to.name as string);
  }
  next();
});

export default router;
