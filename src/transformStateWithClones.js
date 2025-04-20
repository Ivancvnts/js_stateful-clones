'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        stateHistory.push({ ...stateClone });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        stateHistory.push({ ...stateClone });
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        stateHistory.push({ ...stateClone });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
