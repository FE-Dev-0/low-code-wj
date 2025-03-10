import { markRaw } from 'vue';
import type { ComponentMap } from '@/types';
// 该文件只做一件事情，就是形成组件名和具体组件的一个映射关系

// 业务组件
import SingleSelect from '@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue';
import TextNote from '@/components/SurveyComs/Materials/NoteComs/TextNote.vue';

// 引入编辑组件
import TitleEditor from '@/components/SurveyComs/EditItems/TitleEditor.vue';
import DescEditor from '@/components/SurveyComs/EditItems/DescEditor.vue';
import PositionEditor from '@/components/SurveyComs/EditItems/PositionEditor.vue';
import SizeEditor from '@/components/SurveyComs/EditItems/SizeEditor.vue';
import WeightEditor from '@/components/SurveyComs/EditItems/WeightEditor.vue';
import ItalicEditor from '@/components/SurveyComs/EditItems/ItalicEditor.vue';
import TextTypeEditor from '@/components/SurveyComs/EditItems/TextTypeEditor.vue';
import OptionsEditor from '@/components/SurveyComs/EditItems/OptionsEditor.vue';

export const componentMap: ComponentMap = {
  // 业务组件
  'single-select': markRaw(SingleSelect), // 单选组件
  'text-note': markRaw(TextNote), // 文本组件
  // 编辑组件
  'title-editor': markRaw(TitleEditor),
  'desc-editor': markRaw(DescEditor),
  'position-editor': markRaw(PositionEditor),
  'options-editor': markRaw(OptionsEditor),
  'size-editor': markRaw(SizeEditor),
  'weight-editor': markRaw(WeightEditor),
  'italic-editor': markRaw(ItalicEditor),
  'text-type-editor': markRaw(TextTypeEditor),
};
