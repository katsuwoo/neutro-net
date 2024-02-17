'use client';

import { useOptimistic } from "react";

type Props = {
  count: number;
  isActive: boolean;
  activeAction: (id: number) => Promise<{
    message: string;
    isSuccess: boolean;
  }>;
  inactiveAction: (id: number) => Promise<{
    message: string;
    isSuccess: boolean;
  }>;
};

export const useOptimisticCount = ({ count, isActive, activeAction, inactiveAction }: Props) => {
  const [optimisticState, setOptimisticState] = useOptimistic({ count, isActive });

  const updateCount = async (id: number) => {
    const action = isActive ? inactiveAction : activeAction;
    const newState = {
      count: optimisticState.count + (isActive ? -1 : 1),
      isActive: !optimisticState.isActive,
    };

    setOptimisticState(newState);

    try {
      const result = await action(id);
      console.log(result);
      if (!result.isSuccess) {
        setOptimisticState(optimisticState);
      }
    } catch (error) {
      console.error(error);
      setOptimisticState(optimisticState);
    }
  };

  return {
    optimisticState,
    updateCount,
  };
};