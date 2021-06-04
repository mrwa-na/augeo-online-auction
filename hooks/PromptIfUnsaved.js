import Router from 'next/router';
import React from 'react';

class PromptIfUnsaved extends React.Component {
  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload.bind(this));
    Router.router.events.on('routeChangeStart', this.routerIntercept);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload.bind(this));
    Router.router.events.off('routeChangeStart', this.routerIntercept);
    Router.router.events.emit('routeChangeError'); // For NProgress to stop the loading indicator
  }

  routerIntercept = () => {
    const { watching } = this.props;
    // eslint-disable-next-line no-alert
    if (watching && !window.confirm('Do you want to leave this site? Changes you made may not be saved')) {
      Router.router.events.emit('routeChangeError'); // For NProgress to stop the loading indicator
      // eslint-disable-next-line no-throw-literal
      throw 'Igore this error';
    }
  }

  beforeunload(e) {
    const { watching } = this.props;
    if (watching) {
      e.preventDefault();
      e.returnValue = true;
    }
  }

  render() { return null; }
}

export default PromptIfUnsaved;