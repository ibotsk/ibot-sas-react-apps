import React, { useState } from 'react';

import { Button, Menu, MenuItem } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { useTranslation } from 'react-i18next';

import config from 'config';

const { i18n: { options: languageOptions } } = config;

const LangMenu = () => {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <>
      <Button
        aria-controls="language-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleOpen}
        startIcon={<LanguageIcon />}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {i18n.languages[0]}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        {
          Object.keys(languageOptions).map((opt) => (
            <MenuItem
              key={languageOptions[opt].key}
              onClick={() => handleChangeLanguage(languageOptions[opt].key)}
            >
              {languageOptions[opt].label}
            </MenuItem>
          ))
        }
      </Menu>
    </>
  );
};

export default LangMenu;
