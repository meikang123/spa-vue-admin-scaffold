import { Enum, Transform } from '@framework/utils';
import { FormModeEnum } from '@framework/enums';
import { Api } from '@/api';
import { Settings } from '@/config';

// 奇葩配置
const _config = { ...Settings.assistConfig };

const dictToFrontendEnums = dict => {
  const enums = {};
  Object.keys(dict).forEach(key => {
    const enumKey = Transform.toTf(key);
    enums[enumKey] = new Enum();
    dict[key].forEach(dictItem => {
      enums[enumKey].addElement({ alias: dictItem.alias, value: dictItem.code, text: dictItem.name });
    });
  });
  return enums;
};

const configToFrontendEnums = config => {
  const enums = {};
  Object.keys(config).forEach(key => {
    const data = config[key] || {};
    Object.entries(data).forEach(([value, name], index) => {
      if (typeof name === 'string' && Number(value) > 0) {
        const enumKey = Transform.toTf(key);
        if (!enums[enumKey]) enums[enumKey] = new Enum();
        enums[enumKey].addElement({ alias: key + index, value: Number(value), text: name });
      } else {
        _config[key] = data;
      }
    });
  });
  return enums;
};


export default {
  namespaced: true,
  state: {
    enums: null,
    config: _config
  },
  mutations: {
    SET_DICT: (_state, enums) => {
      _state.enums = { ...enums, formMode: FormModeEnum };
    }
  },
  actions: {
    async getDict({ commit }) {
      const res = await Api.Settings.detail();
      if (res && res.code === 0) {
        const { dict = {}, config = {} } = res.data;
        const enums = { ...dictToFrontendEnums(dict), ...configToFrontendEnums(config) };
        commit('SET_DICT', enums);
      }
    }
  }
};
