const getters = {
  roleId: (state, rootGetters) => rootGetters['user/roleId'],
  isAdmin: (state, rootGetters) => rootGetters['user/isAdmin']
};
export default getters;
