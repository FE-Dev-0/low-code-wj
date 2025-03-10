import TextTypeEditor from '@/components/SurveyComs/EditItems/TextTypeEditor.vue';
import TextNote from '@/components/SurveyComs/Materials/NoteComs/TextNote.vue';
import TitleEditor from '@/components/SurveyComs/EditItems/TitleEditor.vue';
import DescEditor from '@/components/SurveyComs/EditItems/DescEditor.vue';
import PositionEditor from '@/components/SurveyComs/EditItems/PositionEditor.vue';
import SizeEditor from '@/components/SurveyComs/EditItems/SizeEditor.vue';
import WeightEditor from '@/components/SurveyComs/EditItems/WeightEditor.vue';
import ItalicEditor from '@/components/SurveyComs/EditItems/ItalicEditor.vue';
import ColorEditor from '@/components/SurveyComs/EditItems/ColorEditor.vue';
import { markRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { changeEditorIsShowStatus } from '@/utils';
import { setCurrentStatus, setTextStatus } from '@/stores/actions';
export default function getStatus() {
  return {
    id: uuidv4(),
    type: markRaw(TextNote),
    name: 'text-note',
    status: {
      type: {
        id: uuidv4(),
        editCom: markRaw(TextTypeEditor),
        status: ['标题', '描述'],
        name: 'text-type-editor',
        currentStatus: 0,
        isShow: true,
      },
      title: {
        id: uuidv4(),
        status: '单选题默认标题',
        isShow: true,
        name: 'title-editor',
        editCom: markRaw(TitleEditor),
      },
      desc: {
        id: uuidv4(),
        status: '单选题默认描述',
        isShow: false,
        name: 'desc-editor',
        editCom: markRaw(DescEditor),
      },
      position: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['左对齐', '居中对齐', '右对齐'],
        isShow: false,
        name: 'position-editor',
        editCom: markRaw(PositionEditor),
      },
      titleSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['22', '20', '18'],
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      descSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['16', '14', '12'],
        isShow: false,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      titleWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      descWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: false,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      titleItalic: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['正常', '斜体'],
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      descItalic: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['正常', '斜体'],
        isShow: false,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      titleColor: {
        id: uuidv4(),
        status: '#000',
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
      descColor: {
        id: uuidv4(),
        status: '#909399',
        isShow: false,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
    },
  };
}

export const getTitleDefaultStatus = () => {
  return getStatus();
};

export const getParagraphDefaultStatus = () => {
  const status = getStatus();
  const typeStatus = status.status;
  const desc =
    '为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！';
  setTextStatus(typeStatus.desc, desc);
  setCurrentStatus(typeStatus.type, 1);

  changeEditorIsShowStatus(typeStatus, 0);
  return status;
};
