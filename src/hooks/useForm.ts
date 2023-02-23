import { Reducer, useReducer } from 'react';

enum ActionType {
  RESET = 'RESET',
  SUBMITTING = 'SUBMITTING',
  SUBMITTED = 'SUBMITTED',
  SUBMIT_ERROR = 'SUBMIT_ERROR',
}

type StateProps = {
  status: 'idle' | 'submitting' | 'submitted' | 'error';
  error?: string | null;
  data: any;
};

type ActionProps = {
  type: 'RESET' | 'SUBMITTING' | 'SUBMITTED' | 'SUBMIT_ERROR';
  payload?: any;
};

const useSubmitForm = (url: string) => {
  const initialState: StateProps = {
    status: 'idle',
    error: null,
    data: '',
  };

  const statusReducer: Reducer<StateProps, ActionProps> = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'RESET':
        return { ...initialState };
      case 'SUBMITTING':
        return { ...initialState, status: 'submitting' };
      case 'SUBMITTED':
        return { ...initialState, status: 'submitted', data: payload };
      case 'SUBMIT_ERROR':
        return { ...initialState, status: 'error', error: payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer<
    (state: StateProps, action: ActionProps) => StateProps
  >(statusReducer, initialState);

  const submitForm = async <ValuesProps>(values: ValuesProps) => {
    dispatch({ type: 'SUBMITTING' });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...values,
        }),
      });
      const data = await response.json();

      dispatch({ type: 'SUBMITTED', payload: data });
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', payload: (error as Error).message });
    }
  };

  const error = (message: string) => {
    dispatch({ type: 'SUBMIT_ERROR', payload: message });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const submitting = () => {
    dispatch({ type: 'SUBMITTING' });
  };

  return [state, submitForm, { reset, error, submitting }] as const;
};

export default useSubmitForm;
