import React from 'react';
import GitHubButton from 'react-github-btn';
import Button from '@mui/material/Button';
import CoffeeIcon from '@mui/icons-material/Coffee';

function SupportButtons() {
  return (
    <div className="about-btn-ctn">
      <GitHubButton
        href="https://github.com/EricWay1024/nott-course"
        data-size="large"
        data-show-count="true"
        aria-label="Star EricWay1024/nott-course on GitHub"
      >
        Star
      </GitHubButton>
      {' '}
      <GitHubButton
        href="https://github.com/sponsors/EricWay1024"
        data-icon="octicon-heart"
        data-size="large"
        aria-label="Sponsor @EricWay1024 on GitHub"
      >
        Sponsor
      </GitHubButton>
      {' '}
      <Button
        href="https://www.buymeacoffee.com/ericway1024"
        variant="outlined"
        size="small"
        sx={{ height: '28px', position: 'relative', top: '-2px' }}
        startIcon={<CoffeeIcon />}
      >
        Buy me a coffee
      </Button>
    </div>
  );
}

export default SupportButtons;
