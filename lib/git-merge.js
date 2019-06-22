'use babel';

import GitMergeView from './git-merge-view';
import { CompositeDisposable } from 'atom';

export default {

  playgroundView: null,
  subscriptions: null,

  activate(state) {
    this.state = state
    this.playgroundView = new GitMergeView();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.playgroundView.destroy();
    this.tile.destroy();
    this.tile = null;
  },

  serialize() {},

  consumeStatusBar(statusBar) {
    this.tile = statusBar .addRightTile({item: this.playgroundView.getElement(), priority: 10});
  }

};
