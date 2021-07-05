import { Dispatch, MouseEvent, MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Avatar } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { MangaChapterImages } from '../../api/types';
import { KeyboardEventHandler } from 'react';

const scrolledBottom = () => window.window.scrollY + window.window.outerHeight >= document.body.offsetHeight;

const scrollVh = (direction: 'up' | 'down' = 'down') => {
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
  window.scroll({
    top: window.scrollY + (vh - headerHeight) * (direction === 'up' ? -1 : 1),
    behavior: 'smooth',
  });
};

export const getScrollClickHandler =
  (setImageNumber: Dispatch<SetStateAction<number>>, images?: MangaChapterImages): MouseEventHandler =>
  () => {
    if (!images) return;
    if (scrolledBottom()) {
      setImageNumber((prevState) => (prevState + 1 < images.length ? prevState + 1 : prevState));
    } else {
      scrollVh('down');
    }
  };

export const getScrollKBHandler = (setImageNumber: Dispatch<SetStateAction<number>>, images?: MangaChapterImages) => {
  return function (e: KeyboardEvent): any {
    // TODO: remove Home/End and fix rerender issues
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key) || e.repeat || !images)
      return;
    e.preventDefault();
    switch (e.key) {
      case 'ArrowDown':
        scrollVh('down');
        break;
      case 'ArrowUp':
        scrollVh('up');
        break;
      case 'ArrowRight':
        setImageNumber((prevState) => (prevState + 1 < images.length ? prevState + 1 : prevState));
        break;
      case 'ArrowLeft':
        setImageNumber((prevState) => (prevState - 1 >= 0 ? prevState - 1 : prevState));
        break;
      case 'End':
        window.scroll(0, document.body.scrollHeight);
        break;
      case 'Home':
        window.scroll(0, 0);
        break;
    }
  };
};
