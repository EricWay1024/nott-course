import React, { useEffect } from 'react';

export default function BMCButton() {
  // const
  useEffect(() => {
    const script = document.createElement('script');
    const div = document.getElementById('supportByBMC');
    script.setAttribute(
      'src',
      'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js',
    );
    script.setAttribute('data-name', 'BMC-Widget');
    script.setAttribute('data-cfasync', 'false');
    script.setAttribute('data-id', 'ericway1024');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute(
      'data-message',
      'Buying a single coffee for me is 1000 times worth than a Thankyou ',
    );
    script.setAttribute('data-color', 'rgba(27, 42, 107, 0.05)');
    script.setAttribute('data-position', 'right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');

    script.onload = () => {
      const evt = document.createEvent('Event');
      evt.initEvent('DOMContentLoaded', false, false);
      window.dispatchEvent(evt);
    };

    div.appendChild(script);
  }, []);

  return <div id="supportByBMC" />;
}
