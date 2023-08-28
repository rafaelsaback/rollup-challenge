import React from 'react';

export const selectTextOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.select();
};
