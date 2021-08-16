'use babel';

import GitMergeView from './git-merge-view';
import {
  CompositeDisposable
} from 'atom';

export default {

  playgroundView: null,
  subscriptions: null,
  tile: null,
  statusBar: null,

  activate(state) {
    this.state = state
    this.gitmergeview = new GitMergeView();

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
    if (atom.project.getRepositories()[0])
      this.tile = statusBar.addRightTile({
        item: this.gitmergeview.getElement(),
        priority: 9.5
      });

    atom.project.onDidChangePaths(() => {
      if (this.tile != null) {
        this.tile.destroy();
      }
      if (atom.project.getRepositories()[0])
        this.tile = statusBar.addRightTile({
          item: this.gitmergeview.getElement(),
          priority: 9.5
        });
    })

  }

};
