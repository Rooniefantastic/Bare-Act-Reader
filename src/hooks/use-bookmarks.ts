"use client";

import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_KEY = 'bare-act-reader-bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(BOOKMARKS_KEY);
      if (item) {
        setBookmarks(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to load bookmarks from localStorage", error);
      setBookmarks([]);
    }
  }, []);

  const updateLocalStorage = (newBookmarks: string[]) => {
    try {
      window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks to localStorage", error);
    }
  };

  const addBookmark = useCallback((sectionId: string) => {
    setBookmarks(prev => {
      if (prev.includes(sectionId)) return prev;
      const newBookmarks = [...prev, sectionId];
      updateLocalStorage(newBookmarks);
      return newBookmarks;
    });
  }, []);

  const removeBookmark = useCallback((sectionId: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.filter(id => id !== sectionId);
      updateLocalStorage(newBookmarks);
      return newBookmarks;
    });
  }, []);

  return { bookmarks, addBookmark, removeBookmark };
}
