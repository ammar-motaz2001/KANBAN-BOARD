'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@/types/task.types';

interface UseKanbanColumnProps {
  tasks: Task[];
  itemsPerPage?: number;
}

interface UseKanbanColumnReturn {
  displayedTasks: Task[];
  hasMore: boolean;
  displayCount: number;
  handleLoadMore: () => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

/**
 * Custom hook for managing Kanban column pagination and infinite scroll
 * @param props - Column props containing tasks and items per page
 * @returns Pagination state and handlers
 */
export function useKanbanColumn({
  tasks,
  itemsPerPage = 5,
}: UseKanbanColumnProps): UseKanbanColumnReturn {
  const [displayCount, setDisplayCount] = useState(itemsPerPage);

  useEffect(() => {
    if (tasks.length <= itemsPerPage) {
      setDisplayCount(itemsPerPage);
    }
  }, [tasks.length, itemsPerPage]);

  const displayedTasks = tasks.slice(0, displayCount);
  const hasMore = tasks.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + itemsPerPage, tasks.length));
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;

    if (scrollBottom < 100 && hasMore) {
      handleLoadMore();
    }
  };

  return {
    displayedTasks,
    hasMore,
    displayCount,
    handleLoadMore,
    handleScroll,
  };
}
