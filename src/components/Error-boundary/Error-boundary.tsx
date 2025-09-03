import React from 'react';
import type { ReactNode } from 'react';

import styles from './Error-boundary.module.scss';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error(`[Error Boundary] caught error: ${error.message}`);
  }

  reloadApp = () => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.page}>
          <h1 className={styles.heading}>Something went wrong</h1>
          <button className={styles.reloadBtn} onClick={this.reloadApp} type="button">
            Reset
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
