import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function SearchBar(props) {
  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      neutral: {
        main: 'rgb(0, 155, 189)',
        contrastText: 'black',
      },
    },
  });

  const {
    value,
    handleChange,
    handleSearch,
    placeholder,
    title,
    isHalf,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} sm={isHalf ? 6 : 12}>
        <div className="search-card">
          <h3 className="card-caption">{title}</h3>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                className="inputBox"
                type="text"
                placeholder={placeholder}
                value={value}
                color="neutral"
                onChange={(event) => handleChange(event)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                className="submit-btn inputButton"
                onClick={handleSearch}
                type="submit"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </ThemeProvider>
  );
}

SearchBar.defaultProps = {
  isHalf: true,
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isHalf: PropTypes.bool,
};

export default SearchBar;
