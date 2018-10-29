import React, { Component } from '@alipay/bigfish/react';

import styles from './<%= Name %>.less';

export default class <%= Name %> extends Component {
  render () {
    return (
      <div className={styles['<%= Name %>']}>
        <h1>Basic Component <%= Name %></h1>
      </div>
    );
  }
}

