import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function ProductItem({ product, photos }) {
  return (
    <>
      <img src={photos[0].url} />
      <div>{product.id}</div>
    </>
  );
}
