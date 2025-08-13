import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const Toolkit = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState(i18n.language === 'ar' ? 'Arabic' : 'English');

  const handleLangClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangClose = (lang) => {
    if (lang) {
      setLanguage(lang);
      i18n.changeLanguage(lang === 'English' ? 'en' : 'ar');
    }
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* <Box sx={{ width: 32, height: 32, bgcolor: '#eee', borderRadius: 1 }} /> */}
          <Typography variant='h4'>LOGO</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button sx={{ fontWeight: 'bold', borderBottom: '2px solid black', borderRadius: 0 }} color="inherit">{t('home')}</Button>
          <Button color="inherit">{t('categories')}</Button>
          <Button color="inherit">{t('contact')}</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', px: 1, borderRadius: 1 }}>
            <InputBase
              placeholder={t('searchPlaceholder')}
              sx={{ ml: 1, flex: 1, fontSize: 14, border: 2, p:1, borderRadius: 4 }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="submit" sx={{ p: '6px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
          <IconButton color="inherit"><FavoriteBorderIcon /></IconButton>
          <IconButton color="inherit"><ShoppingCartOutlinedIcon /></IconButton>
          <IconButton color="inherit"><AccountCircleIcon /></IconButton>
          <Button
            variant="outlined"
            sx={{ textTransform: 'none', borderRadius: 2, minWidth: 40 }}
            onClick={handleLangClick}
          >
            {language === 'English' ? 'عربي' : 'English'}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleLangClose()}
          >
            <MenuItem onClick={() => handleLangClose('English')}>English</MenuItem>
            <MenuItem onClick={() => handleLangClose('Arabic')}>عربي</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Toolkit;