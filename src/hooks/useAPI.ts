import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Call, ApiResponse } from '../types';

const useAPI = () => {
  const getCalls = useCallback(async (): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/calls`);

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });
        return null;
      }

      return await response.json();
    } catch (e) {
      console.log(e);
      toast(`API request failed`, { type: 'error' });
      return null;
    }
  }, []);

  const addCall = useCallback(async (call: Call): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(call)
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });
        return null;
      }

      return await response.json();
    } catch (e) {
      console.log(e);
      toast(`API request failed`, { type: 'error' });
      return null;
    }
  }, []);

  return {
    getCalls,
    addCall
  };
};

export default useAPI;
