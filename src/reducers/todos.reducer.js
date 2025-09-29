// src/reducers/todos.reducer.js
import { mapRecordsToTodos } from '../shared/todoMapping';

export const actions = {
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    setLoadError: 'setLoadError',
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    revertTodo: 'revertTodo',
    clearError: 'clearError',
    setSortDirection: 'setSortDirection',
    setSortField: 'setSortField',
    setQueryString: 'setQueryString',
};

export const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage: '',
    sortDirection: 'desc',
    sortField: 'createdTime',
    queryString: '',
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.fetchTodos: {
            return { ...state, isLoading: true };
        }
        case actions.loadTodos: {
            const todos = mapRecordsToTodos(action.records ?? []);
            return { ...state, todoList: todos, isLoading: false };
        }
        case actions.setLoadError: {
            return {
                ...state,
                errorMessage: action.error?.message ?? String(action.error ?? ''),
                isLoading: false,
                isSaving: false,
            };
        }
        case actions.startRequest: {
            return { ...state, isSaving: true };
        }
        case actions.addTodo: {
            const created = mapRecordsToTodos(action.records ?? [])[0] ?? null;
            const next = created ? [...state.todoList, created] : state.todoList;
            return { ...state, todoList: next, isSaving: false };
        }
        case actions.endRequest: {
            return { ...state, isLoading: false, isSaving: false };
        }
        case actions.revertTodo: {
            action.editedTodo = action.originalTodo ?? action.editedTodo;
            // no return: fallthrough a updateTodo
        }
        case actions.updateTodo: {
            const edited = action.editedTodo;
            const updatedTodos = state.todoList.map((t) => t.id === edited.id ? { ...t, ...edited } : t );
            const updatedState = { ...state, todoList: updatedTodos };
            if (action.error) {
                updatedState.errorMessage =  action.error?.message ?? String(action.error);
            }
            return updatedState;
        }
        case actions.completeTodo: {
            const id = action.id;
            const updatedTodos = state.todoList.map((t) => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t);
            return { ...state, todoList: updatedTodos };
        }
        case actions.clearError: {
            return { ...state, errorMessage: '' };
        }
        case actions.setSortDirection:
            return { ...state, sortDirection: action.value };
        case actions.setSortField:
            return { ...state, sortField: action.value };
        case actions.setQueryString:
            return { ...state, queryString: action.value };
        default:
            return state;
    }
}
